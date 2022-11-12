import fifo from 'fifo'

type Packet = {
    id: number
    data: any
}

type QueuedPacket = [Packet, Packet | null]

const outputPacket = (packet: Packet) => {
    console.log(`Packet ID: ${packet.id} Data: ${packet.data}`)
}

const queue = fifo<QueuedPacket>()

const packet1: QueuedPacket = [{id: 0, data: "hi"}, null]
queue.push(packet1)
setTimeout(() => {
    packet1[1] = {id: 0, data: "hi again"}
    checkTopPacket()
}, 1000)


const packet2: QueuedPacket = [{id: 1, data: "hello"}, null]
queue.push(packet2)
setTimeout(() => {
    packet2[1] = {id: 1, data: "world"}
    checkTopPacket()
}, 3000)

const packet3: QueuedPacket = [{id: 2, data: "hello"}, {id: 2, data: "world"}]
queue.push(packet3)
// setTimeout(() => {
//     packet3[1] = {id: 2, data: "world"}
//     checkTopPacket()
// }, 1500)

const checkTopPacket = () => {
    if (queue.first() != null && queue.first()[1] != null) {
        outputPacket(queue.shift()[1])
        checkTopPacket()
    }
}

checkTopPacket()
