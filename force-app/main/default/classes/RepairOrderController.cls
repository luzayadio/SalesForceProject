public with sharing class RepairOrderController {
    @AuraEnabled(cacheable=true)
    public static List<Repair_order_Technician__c> getTechnical(String repairOrderId) {
        return [SELECT Id, Name, Technician__c, Repair_Order__c FROM Repair_order_Technician__c WHERE
        Repair_Order__c = :repairOrderId];
    }

    @AuraEnabled(cacheable=true)
    public static void deleteTechnicalRepairOrder(String id, String repairOrderId, String technicianId) {
        Repair_order_Technician__c[] data = [SELECT Id, Name, Technician__c, Repair_Order__c FROM Repair_order_Technician__c WHERE
        Repair_Order__c = :repairOrderId AND Technician__c = :technicianId];
        //Id = :id];

        try {
            delete data;
        } catch(DmlException e) {
            System.debug(e);
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<RepairOrder_ReplacementPart__c> getReplacementPart(String repairOrderId) {
        return [SELECT Id, Name, Replacement_part__c, Repair_Order__c FROM RepairOrder_ReplacementPart__c WHERE
        Repair_Order__c = :repairOrderId];
    }
}