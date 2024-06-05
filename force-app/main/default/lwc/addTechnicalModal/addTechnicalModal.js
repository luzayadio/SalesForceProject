import { api } from 'lwc';
import LightningModal from 'lightning/modal';

import Repair_order_Technician__c from "@salesforce/schema/Repair_order_Technician__c";

export default class AddTechnicalModal extends LightningModal {
    objectApiName = Repair_order_Technician__c;
    @api content;

    async handleSuccess(event) {
        console.log("id technician " + event.detail.id);
        if(event.detail.id) {
            this.close('okay');
        }
    }

    cancelClick(event) {
        event.preventDefault(); // stop the form from submitting
        this.close('okay'); // close modal
    }
}