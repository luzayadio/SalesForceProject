import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';

import Technician__c from "@salesforce/schema/Technician__c";
import insertTechnicalRepairOrder from "@salesforce/apex/RepairOrderController.insertTechnicalRepairOrder";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import Repair_Order__cFIELD from '@salesforce/schema/Repair_order_Technician__c.Repair_Order__c';
import Technician__cFIELD from '@salesforce/schema/Repair_order_Technician__c.Technician__c';
import NameFIELD from '@salesforce/schema/Repair_order_Technician__c.Name';

export default class CreateTechnicianModal extends LightningModal {
    objectApiName = Technician__c;
    @api content;
    @track error;
    @track repairTechnician = {
        Repair_Order__c: Repair_Order__cFIELD,
        Technician__c: Technician__cFIELD,
        Name: NameFIELD
    };

    async handleSuccess(event) {
        console.log("id technician " + event.detail.id);
        if(event.detail.id) {
            await this.saveAccountAction(this.content, event.detail.id);
            this.close('okay');
        }
    }

    async saveAccountAction(repairOrderId, technicianId) {
        this.repairTechnician.Repair_Order__c = repairOrderId;
        this.repairTechnician.Technician__c = technicianId;
        this.repairTechnician.Name = repairOrderId + "-" + technicianId;
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