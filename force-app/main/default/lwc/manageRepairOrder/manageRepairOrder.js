import { LightningElement, api, wire, track } from 'lwc';
import AddTechnicalModal from "c/addTechnicalModal";
// import AddReplacementPartModal from "c/addReplacementPartModal";

import getTechnical from "@salesforce/apex/RepairOrderController.getTechnical";
import deleteTechnicalRepairOrder from "@salesforce/apex/RepairOrderController.deleteTechnicalRepairOrder";
// import getReplacementPart from "@salesforce/apex/RepairOrderController.getReplacementPart";
import { refreshApex } from '@salesforce/apex';

const actions = [
    { label: 'Delete', name: 'delete' },
];

const columnsTec = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Quantity', fieldName: 'Technician__c', type: "text"},
    { label: 'Utilization', fieldName: 'Utilization', type: 'text'},
    { type: 'action', typeAttributes: { rowActions: actions }},
];

// const columnsRP = [
//     { label: 'Name', fieldName: 'Name', type: 'text' },
//     { label: 'Quantity', fieldName: 'Replacement_part__c', type: "text"},
//     { type: 'action', typeAttributes: { rowActions: actions }},
// ];

export default class ManageRepairOrder extends LightningElement {
    @api recordId; //to get the current Repair Order ID in the record page
    @track columnsTec = columnsTec;
    // @track columnsRP = columnsRP;
    @wire(getTechnical, {repairOrderId: '$recordId'}) technicial;
    // @wire(getReplacementPart, {repairOrderId: '$recordId'}) replacementParts;

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
        await refreshApex(this.technicial);
        /*  */
        if(result == "again") {
            await this.newTechnicalClick(event);
        }
    }

    // async newReplacementPartClick(event) {
    //     const result = await AddReplacementPartModal.open({
    //         // `label` is not included here in this example.
    //         // it is set on lightning-modal-header instead
    //         size: 'small',
    //         description: 'Accessible description of modal\'s purpose',
    //         content: this.recordId,
    //     });
    //     // if modal closed with X button, promise returns result = 'undefined'
    //     // if modal closed with OK button, promise returns result = 'okay'
    //     // if modal closed with SAVE & NEW button, promise returns result = 'again'
    //     console.log(result);
    //     // actualizar dados da lista
    //     await refreshApex(this.replacementParts);
    //     /*  */
    //     if(result == "again") {
    //         await this.newReplacementPartClick(event);
    //     }
    // }

    async deleteRow(row) {
        try{
            const { Id, Repair_Order__c, Technician__c } = row;
            console.log(Id);
            const index = this.findRowIndexById(Id);
            // if (index !== -1) {
            //     this.technicial = this.technicial
            //         .slice(0, index)
            //         .concat(this.technicial.slice(index + 1));

                await deleteTechnicalRepairOrder({ id : Id, repairOrderId: Repair_Order__c, technicianId: Technician__c });
            //}
        } catch(err) {
            console.log(err);
        }
    }

    handleRowAction(event) {
        try {
            const actionName = event.detail.action.name;
            const row = event.detail.row;
            console.log(actionName);
            console.log(row);
            switch (actionName) {
                case 'delete':
                    console.log("Here");
                    this.deleteRow(row);
                    console.log("After");
                    break;
                // case 'show_details':
                    //this.showRowDetails(row);
                    // break;
                default: break;
            }
        } catch(er) {
            console.log(er);
        }
    }
}