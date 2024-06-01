import {DrugBurn} from "../types";

// handleDrugBurn
import {CosmosMessage} from "@subql/types-cosmos";

// handle pre-filtered handleDrugBurn Messages
export async function handleDrugBurn(
    msg: CosmosMessage
): Promise<void> {
    logger.info("NEW BURN FOUND");
    // logger.info(JSON.stringify(msg)); // show MSGDetails (BigInt JSON ISSUE)
    logger.info(JSON.stringify(msg.msg.typeUrl)); // show MSGDetails
    logger.info(JSON.stringify(msg.msg.decodedMsg)); // show MSGDetails
    logger.info(JSON.stringify(msg.msg.decodedMsg.sender)); // show MSGDetails
    logger.info(JSON.stringify(msg.msg.decodedMsg.funds)); // show MSGDetails
    logger.info(JSON.stringify(msg.msg.decodedMsg.contract)); // show MSGDetails
    logger.info(JSON.stringify(msg.msg.decodedMsg.msg)); // show MSGDetails

    // Create record
    const drugBurnEntity = DrugBurn.create({
        id: `${msg.tx.hash}-${msg.idx}`,
        blockHeight: BigInt(msg.block.block.header.height),
        txHash: msg.tx.hash,
        sender: msg.msg.decodedMsg.sender,
        amount: msg.msg.decodedMsg.msg.burn.amount
    });
    await drugBurnEntity.save();
}