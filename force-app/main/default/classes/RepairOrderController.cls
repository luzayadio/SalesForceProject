public with sharing class RepairOrderController {
    @AuraEnabled(cacheable=false)
    public static List<Repair_order_Technician__c> getRepairTechnical(String repairOrderId) {
        List<Repair_order_Technician__c> queryData = [SELECT Id, Name, Technician__c, Repair_Order__c FROM Repair_order_Technician__c WHERE
        Repair_Order__c = :repairOrderId];
        return queryData;
    }

    @AuraEnabled(cacheable=false)
    public static List<Technician__c> getTechnical() {
        return [SELECT Id, Name, Utilization__c, Quantity__c FROM Technician__c];
    }

    @AuraEnabled(cacheable=false)
    public static List<Repair_order_Technician__c> deleteTechnicalRepairOrder(String id) {
        Repair_order_Technician__c[] data = [SELECT Id, Name FROM Repair_order_Technician__c WHERE Id = :id];

        delete data;
        return data;
    }

    @AuraEnabled(cacheable=false)
    public static List<RepairOrder_ReplacementPart__c> getRepairReplacementsPart(String repairOrderId) {
        return [SELECT Id, Name, Replacement_part__c, Repair_Order__c FROM RepairOrder_ReplacementPart__c WHERE
        Repair_Order__c = :repairOrderId];
    }

    @AuraEnabled(cacheable=false)
    public static List<Replacement_part__c> getReplacementsPart() {
        return [SELECT Id, Name, Quantity__c, Unit_Cost__c, Total_Cost__c FROM Replacement_part__c];
    }

    @AuraEnabled(cacheable=false)
    public static List<RepairOrder_ReplacementPart__c> deleteReplacementPartOrder(String id) {
        RepairOrder_ReplacementPart__c[] data = [SELECT Id, Name FROM RepairOrder_ReplacementPart__c WHERE Id = :id];

        delete data;
        return data;
    }

    @AuraEnabled
    public static Repair_order_Technician__c insertTechnicalRepairOrder(Repair_order_Technician__c repairTecObj) {
        try {
            System.debug('insertTechnicalRepairOrder');
            insert repairTecObj;
            return repairTecObj;
        } catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
    }

}