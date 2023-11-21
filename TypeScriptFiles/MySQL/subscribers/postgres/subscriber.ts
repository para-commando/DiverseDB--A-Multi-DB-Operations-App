import { EventSubscriber, EntitySubscriberInterface } from "typeorm"

@EventSubscriber()
export class subscriber implements EntitySubscriberInterface {

}
