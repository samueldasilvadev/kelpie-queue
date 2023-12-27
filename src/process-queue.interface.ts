interface ProcessQueue<CallbackType> {
    startup(callback: CallbackType): Promise<void>
}
