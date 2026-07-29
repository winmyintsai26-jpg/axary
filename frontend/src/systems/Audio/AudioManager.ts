export type AudioChannel = 'ambience' | 'birds' | 'music' | 'water' | 'wind'

class AudioManager {
  private context: AudioContext | null = null
  private master: GainNode | null = null
  private channels = new Map<AudioChannel, GainNode>()

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
}

export const audioManager = new AudioManager()
