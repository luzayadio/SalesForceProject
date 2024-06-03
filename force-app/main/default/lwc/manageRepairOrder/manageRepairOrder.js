import { LightningElement, api, wire, track } from 'lwc';
import AddTechnicalModal from "c/addTechnicalModal";

import AddReplacementPartModal from "c/addReplacementPartModal";
import createTechnicianModal from "c/createTechnicianModal";

import getRepairTechnical from "@salesforce/apex/RepairOrderController.getRepairTechnical";
import getTechnical from "@salesforce/apex/RepairOrderController.getTechnical";
import deleteTechnicalRepairOrder from "@salesforce/apex/RepairOrderController.deleteTechnicalRepairOrder";

import getRepairReplacementsPart from "@salesforce/apex/RepairOrderController.getRepairReplacementsPart";
import getReplacementsPart from "@salesforce/apex/RepairOrderController.getReplacementsPart";
import deleteReplacementPartOrder from "@salesforce/apex/RepairOrderController.deleteReplacementPartOrder";


const actions = [
    { label: 'Delete', name: 'delete' },
];

const columnsTec = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Quantity', fieldName: 'Quantity', type: "text"},
    { label: 'Utilization', fieldName: 'Utilization', type: 'text'},
    { type: 'action', typeAttributes: { rowActions: actions }},
];

const columnsRP = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Quantity', fieldName: 'Quantity', type: "text"},
    { label: 'Unit Cost', fieldName: 'UnitCost', type: "text"},
    { label: 'Total Cost', fieldName: 'TotalCost', type: "text"},
    { type: 'action', typeAttributes: { rowActions: actions }},
];

export default class ManageRepairOrder extends LightningElement {
    @api recordId; //to get the current Repair Order ID in the record page

    @track columnsTec = columnsTec;
    @track repairTechnicial = [];

    @track repairReplacements = [];
    @track columnsRP = columnsRP;

    connectedCallback() {
        console.log("connectedCallback");
        this.getRepairTechnicalJS();
        this.getRepairReplacementPartJS();
    }

    /* START Technical CODE */
    async getRepairTechnicalJS() {
        var technical = await getTechnical();

        getRepairTechnical({repairOrderId: this.recordId}).then(result => {
            this.repairTechnicial = [...result].map(record => {
                record["Name"] = technical.find((e) => e["Id"] == record["Technician__c"])["Name"];
                record["Quantity"] = technical.find((e) => e["Id"] == record["Technician__c"])["Quantity__c"];
                record["Utilization"] = technical.find((e) => e["Id"] == record["Technician__c"])["Utilization__c"] + "%";
                return record;
            });
        }).catch(error => {
            console.log("error");
            console.log(error);
            this.error = error;
        });
    }   

    async connectTechnicalClick(event) {
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
        await this.getRepairTechnicalJS();
        /*  */
        if(result == "again") {
            await this.newTechnicalClick(event);
        }
    }

    async newTechnicalClick(event) {
        const result = await createTechnicianModal.open({
            // `label` is not included here in this example.
            // it is set on lightning-modal-header instead
            size: 'small',
            description: '',
            content: this.recordId,
        });
        
        // if modal closed with X button, promise returns result = 'undefined'
        // if modal closed with OK button, promise returns result = 'okay'
        // if modal closed with SAVE & NEW button, promise returns result = 'again'
        console.log(result);
        // actualizar dados da lista
        await this.getRepairTechnicalJS();
        /*  */
        if(result == "again") {
            await this.newTechnicalClick(event);
        }
    }

    async deleteTechnicalRow(row) {
        try{
            const { Id } = row;

            const d = await deleteTechnicalRepairOrder({ id: Id});
            console.log(d);
            await this.getRepairTechnicalJS();
        } catch(err) {
            console.log(err);
        }
    }

    handleTechnicalRowAction(event) {
        try {
            const actionName = event.detail.action.name;
            const row = event.detail.row;
            switch (actionName) {
                case 'delete':
                    this.deleteTechnicalRow(row);
                    break;
                default: break;
            }
        } catch(er) {
            console.log(er);
        }
    }
    /* END Technical CODE */

    /* START Replacement Part CODE */
    async getRepairReplacementPartJS() {
        var replacementParts = await getReplacementsPart();
        console.log(replacementParts);

        getRepairReplacementsPart({repairOrderId: this.recordId}).then(result => {
            console.log(result);
            this.repairReplacements = [...result].map(record => {
                record["Name"] = replacementParts.find((e) => e["Id"] == record["Replacement_part__c"])["Name"];
                record["Quantity"] = replacementParts.find((e) => e["Id"] == record["Replacement_part__c"])["Quantity__c"];
                record["UnitCost"] = replacementParts.find((e) => e["Id"] == record["Replacement_part__c"])["Unit_Cost__c"] + ' €';
                record["TotalCost"] = replacementParts.find((e) => e["Id"] == record["Replacement_part__c"])["Total_Cost__c"] + ' €';
                return record;
            });
        }).catch(error => {
            console.log("error");
            console.log(error);
            this.error = error;
        });
    }   

    async connectReplacementPartClick(event) {
        const result = await AddReplacementPartModal.open({
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
        await this.getRepairReplacementPartJS();
        /*  */
        if(result == "again") {
            await this.newReplacementPartClick(event);
        }
    }

    async deleteRPartRow(row) {
        try{
            const { Id } = row;
            const d = await deleteReplacementPartOrder({ id: Id});
            console.log(d);
            await this.getRepairReplacementPartJS();
        } catch(err) {
            console.log(err);
        }
    }

    handleRPartRowAction(event) {
        try {
            const actionName = event.detail.action.name;
            const row = event.detail.row;
            switch (actionName) {
                case 'delete':
                    this.deleteRPartRow(row);
                    break;
                default: break;
            }
        } catch(er) {
            console.log(er);
        }
    }
    /* END Replacement Part CODE */
}