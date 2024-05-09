import { LightningElement, api, wire, track } from 'lwc';
import AddTechnicalModal from "c/addTechnicalModal";

import getTechnical from "@salesforce/apex/RepairOrderController.getTechnical";
import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Quantity', fieldName: 'Technician__c', type: "text"},
    { label: 'Utilization', fieldName: 'Utilization', type: 'text'}
];

export default class ManageRepairOrder extends LightningElement {
    @api recordId; //to get the current Repair Order ID in the record page
    @track columns = columns;
    @wire(getTechnical, {repairOrderId: '$recordId'}) repairOrders;

    async newTechnicalClick(event) {
        const result = await AddTechnicalModal.open({
            // `label` is not included here in this example.
            // it is set on lightning-modal-header instead
            size: 'small',
            description: 'Accessible description of modal\'s purpose',
            content: this.recordId,
        });
        // if modal closed with X button, promise returns result = 'undefined'
        // if modal closed with OK button, promise returns result = 'okay'
        // if modal closed with SAVE & NEW button, promise returns result = 'again'
        console.log(result);
        // actualizar dados da lista
        await refreshApex(this.repairOrders);
        /*  */
        if(result == "again") {
            await this.newTechnicalClick(event);
        }
    }
}