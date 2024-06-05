import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';

import Replacement_part__c from "@salesforce/schema/Replacement_part__c";
import insertReplacementPartRepairOrder from "@salesforce/apex/RepairOrderController.insertReplacementPartRepairOrder";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import Repair_Order__cFIELD from '@salesforce/schema/RepairOrder_ReplacementPart__c.Repair_Order__c';
import Replacement_part__cFIELD from '@salesforce/schema/RepairOrder_ReplacementPart__c.Replacement_part__c';
import NameFIELD from '@salesforce/schema/RepairOrder_ReplacementPart__c.Name';

export default class CreateReplacementPartModal extends LightningModal {
    objectApiName = Replacement_part__c;
    @api content;
    @track error;
    @track repairReplacementP = {
        Repair_Order__c: Repair_Order__cFIELD,
        Replacement_part__c: Replacement_part__cFIELD,
        Name: NameFIELD
    };

    async handleSuccess(event) {
        console.log("id replacement part " + event.detail.id);
        if(event.detail.id) {
            await this.saveAccountAction(this.content, event.detail.id);
            this.close('okay');
        }
    }

    async saveAccountAction(repairOrderId, replacementId) {
        this.repairReplacementP.Repair_Order__c = repairOrderId;
        this.repairReplacementP.Replacement_part__c = replacementId;
        this.repairReplacementP.Name = repairOrderId + "-" + replacementId;
        window.console.log("before save");
        insertReplacementPartRepairOrder({repairRepPObj: this.repairReplacementP}).then(result=>{
            window.console.log("after save");
            
            const toastEvent = new ShowToastEvent({
                title:"Success!",
                message:"Replacement Part created successfully",
                variant:"success"
            });
            this.dispatchEvent(toastEvent);
        }).catch(error=>{
            window.console.log("error");
            window.console.log(error);
            this.error = error.message;
        });
    }
}