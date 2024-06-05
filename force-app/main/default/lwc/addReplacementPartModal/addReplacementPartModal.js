import { api } from 'lwc';
import LightningModal from 'lightning/modal';

import RepairOrder_ReplacementPart__c from "@salesforce/schema/RepairOrder_ReplacementPart__c";

export default class AddReplacementPartModal extends LightningModal {
    objectApiName = RepairOrder_ReplacementPart__c;
    @api content;

    async handleSuccess(event) {
        console.log("id replacement " + event.detail.id);
        if(event.detail.id) {
            this.close('okay');
        }
    }

    cancelClick(event) {
        event.preventDefault(); // stop the form from submitting
        this.close('okay'); // close modal
    }
}