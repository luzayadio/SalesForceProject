import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';

import Technician__c from "@salesforce/schema/Technician__c";
import insertTechnicalRepairOrder from "@salesforce/apex/RepairOrderController.insertTechnicalRepairOrder";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import Repair_order_Technician__c from "@salesforce/schema/Repair_order_Technician__c";
import Repair_Order__cFIELD from '@salesforce/schema/Repair_order_Technician__c.Repair_Order__c';
import Technician__cFIELD from '@salesforce/schema/Repair_order_Technician__c.Technician__c';
import NameFIELD from '@salesforce/schema/Repair_order_Technician__c.Name';

export default class CreateTechnicianModal extends LightningModal {
    objectApiName = Technician__c;
    @api content;
    technicianId;
    @track error;
    @track Repair_order_Technician__c;
    @track repairTechnician = {
        Repair_Order__c: Repair_Order__cFIELD,
        Technician__c: Technician__cFIELD,
        Name: NameFIELD
    };

    async handleSuccess(event) {
        console.log("id technician " + event.detail.id);
        this.technicianId = event.detail.id;
        await this.saveAccountAction(this.content, event.detail.id);
    }

    save(event) {
        try{
            var fields = event.detail.fields;
            this.template.querySelector('lightning-record-edit-form').submit(fields);
            const evt = new ShowToastEvent({
                title: 'New Technician',
                message: 'Created sucessfull',
                variant: 'success',
            });
            this.dispatchEvent(evt);
        } catch(er) {
            console.log("erro");
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

    async saveAccountAction(repairOrderId, technicianId) {
        this.repairTechnician.Repair_Order__c = repairOrderId;
        this.repairTechnician.Technician__c = technicianId;
        this.repairTechnician.Name = repairOrderId + "-" + technicianId;
        console.log(this.repairTechnician);
        console.log(this.Repair_order_Technician__c);
        window.console.log("before save");
        insertTechnicalRepairOrder({repairTecObj: this.repairTechnician}).then(result=>{
            window.console.log("after save");
            
            const toastEvent = new ShowToastEvent({
                title:"Success!",
                message:"Technician created successfully",
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