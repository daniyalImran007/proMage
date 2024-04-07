import { connect, Channel, Connection } from "amqplib/callback_api";

class RabbitMQService {
  private readonly queueName: string;
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private channelInitialized: boolean = false;

  constructor(queueName: string) {
    this.queueName = queueName;
  }

  public connectToRabbitMQ(): void {
    connect("amqp://localhost", (error0, connection) => {
      if (error0) {
        throw error0;
      }
      this.connection = connection;
      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }
        this.channel = channel;
        this.channelInitialized = true;
        channel.assertQueue(this.queueName, {
          durable: true,
        });
      });
    });
  }

  public sendToQueue(message: string): void {
    if (!this.channelInitialized) {
      // Check channelInitialized instead of channel
      throw new Error("RabbitMQ channel not initialized.");
    }
    this.channel?.sendToQueue(this.queueName, Buffer.from(message), {
      persistent: true,
    });
    console.log(`[x] Sent message to queue: ${message}`);
  }

  // public consumeFromQueue(callback: (message: string) => void): void {
  //   if (!this.channelInitialized) {
  //     // Check channelInitialized instead of channel
  //     throw new Error(
  //       "RabbitMQ channel not initialized."
  //     );
  //   }
  //   this.channel?.consume(
  //     this.queueName,
  //     (msg) => {
  //       if (msg !== null) {
  //         callback(msg.content.toString());
  //         this.channel?.ack(msg);
  //       }
  //     },
  //     {
  //       noAck: false,
  //     }
  //   );
  // }

  public isChannelInitialized(): boolean {
    return this.channelInitialized;
  }
}

export default RabbitMQService;
