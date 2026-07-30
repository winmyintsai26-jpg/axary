export type AudioChannel = 'ambience' | 'birds' | 'music' | 'water' | 'wind'

class AudioManager {
  private context: AudioContext | null = null
  private master: GainNode | null = null
  private channels = new Map<AudioChannel, GainNode>()
  private heartStarted = false
  private lastFootstepAt = 0

  async activate() {
    if (typeof window === 'undefined' || !window.AudioContext) return

    if (!this.context) {
      this.context = new AudioContext()
      this.master = this.context.createGain()
      this.master.gain.value = 0
      this.master.connect(this.context.destination)

      const channelNames: AudioChannel[] = [
        'ambience',
        'birds',
        'music',
        'water',
        'wind',
      ]

      channelNames.forEach((channel) => {
        const gain = this.context!.createGain()
        gain.gain.value = 1
        gain.connect(this.master!)
        this.channels.set(channel, gain)
      })
    }

    if (this.context.state === 'suspended') {
      await this.context.resume()
    }
  }

  async beginJourney() {
    await this.activate()
    if (!this.context || !this.master) return

    const now = this.context.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(this.master.gain.value, now)
    this.master.gain.linearRampToValueAtTime(0.72, now + 5)
  }

  setChannelVolume(channel: AudioChannel, volume: number) {
    const gain = this.channels.get(channel)
    if (!gain || !this.context) return

    gain.gain.setTargetAtTime(
      Math.min(1, Math.max(0, volume)),
      this.context.currentTime,
      0.4,
    )
  }

  getChannelInput(channel: AudioChannel) {
    return this.channels.get(channel) ?? null
  }

  private createNoiseLoop(channel: AudioChannel, volume: number, frequency: number) {
    if (!this.context) return
    const input = this.channels.get(channel)
    if (!input) return

    const buffer = this.context.createBuffer(
      1,
      this.context.sampleRate * 4,
      this.context.sampleRate,
    )
    const data = buffer.getChannelData(0)
    for (let index = 0; index < data.length; index += 1) {
      data[index] = Math.random() * 2 - 1
    }
    const source = this.context.createBufferSource()
    const filter = this.context.createBiquadFilter()
    const gain = this.context.createGain()
    source.buffer = buffer
    source.loop = true
    filter.type = channel === 'water' ? 'bandpass' : 'lowpass'
    filter.frequency.value = frequency
    gain.gain.value = volume
    source.connect(filter)
    filter.connect(gain)
    gain.connect(input)
    source.start()
  }

  private playTone(
    channel: AudioChannel,
    frequency: number,
    duration: number,
    volume: number,
    delay = 0,
  ) {
    if (!this.context) return
    const input = this.channels.get(channel)
    if (!input) return
    const start = this.context.currentTime + delay
    const oscillator = this.context.createOscillator()
    const gain = this.context.createGain()
    oscillator.type = channel === 'music' ? 'sine' : 'triangle'
    oscillator.frequency.setValueAtTime(frequency, start)
    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(volume, start + Math.min(1.4, duration * 0.25))
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
    oscillator.connect(gain)
    gain.connect(input)
    oscillator.start(start)
    oscillator.stop(start + duration + 0.1)
  }

  async enterHeartWorld() {
    await this.activate()
    if (!this.context || this.heartStarted) return
    this.heartStarted = true

    this.createNoiseLoop('wind', 0.035, 520)
    this.createNoiseLoop('water', 0.026, 920)
    this.createNoiseLoop('ambience', 0.012, 260)
    this.setChannelVolume('music', 0.28)
    this.setChannelVolume('birds', 0.34)

    this.playTone('birds', 1450, 0.24, 0.025, 2)
    this.playTone('birds', 1840, 0.2, 0.018, 2.32)
    this.playTone('ambience', 784, 5.5, 0.014, 6)
    window.setInterval(() => {
      this.playTone('birds', 1200 + Math.random() * 750, 0.18, 0.018)
      this.playTone('birds', 1500 + Math.random() * 600, 0.16, 0.012, 0.24)
    }, 17_000)
    window.setInterval(() => {
      this.playTone('ambience', 660, 5, 0.012)
      this.playTone('ambience', 990, 4.2, 0.008, 0.8)
    }, 31_000)
    window.setInterval(() => {
      this.playTone('music', 220, 11, 0.012)
      this.playTone('music', 330, 10, 0.008, 1.4)
      this.playTone('music', 440, 8, 0.006, 2.8)
    }, 53_000)
  }

  playFootstep() {
    if (!this.context || this.context.currentTime - this.lastFootstepAt < 0.24) return
    this.lastFootstepAt = this.context.currentTime
    this.playTone('ambience', 92 + Math.random() * 18, 0.11, 0.014)
  }
}

export const audioManager = new AudioManager()
