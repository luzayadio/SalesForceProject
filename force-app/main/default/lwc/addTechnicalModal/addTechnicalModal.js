import { api } from 'lwc';
import LightningModal from 'lightning/modal';

import Repair_order_Technician__c from "@salesforce/schema/Repair_order_Technician__c";

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AddTechnicalModal extends LightningModal {
    objectApiName = Repair_order_Technician__c;
    // myfields = [Technician__c, Repair_Order__c];
    @api content;

    save(event) {
        try{
            var fields = event.detail.fields;
            var tech = this.template.querySelector('.tech');
            console.log(tech);
            console.log(tech.value);
            this.template.querySelector('lightning-record-edit-form').submit(fields);
            const evt = new ShowToastEvent({
                title: 'Add Technician',
                message: 'Created sucessfull',
                variant: 'success',
            });
            this.dispatchEvent(evt);
        } catch(er) {
            console.log(er);
        }
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