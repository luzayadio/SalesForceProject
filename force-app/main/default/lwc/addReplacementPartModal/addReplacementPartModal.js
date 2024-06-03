import { api } from 'lwc';
import LightningModal from 'lightning/modal';

import RepairOrder_ReplacementPart__c from "@salesforce/schema/RepairOrder_ReplacementPart__c";

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AddReplacementPartModal extends LightningModal {
    objectApiName = RepairOrder_ReplacementPart__c;
    // myfields = [Technician__c, Repair_Order__c];
    @api content;

    save(event) {
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        const evt = new ShowToastEvent({
            title: 'Add Replacement Part',
            message: 'Created sucessfull',
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }

    saveAndNewClick(event) {
        try{
            event.preventDefault(); // stop the form from submitting
            this.save(event); // call save method
            this.close('again'); // close modal
        } catch(er) {
            console.log(er);
        }
    }

    saveClick(event) {
        try{
            event.preventDefault(); // stop the form from submitting
            this.save(event); // call save method
            this.close('okay'); // close modal
        } catch(er) {
            console.log(er);
        }
    }

    cancelClick(event) {
        event.preventDefault(); // stop the form from submitting
        this.close('okay'); // close modal
    }
}