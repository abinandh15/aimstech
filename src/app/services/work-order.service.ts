import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc } from '@angular/fire/firestore';
import { deleteDoc } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { WorkOrder } from '../models/work-order';



@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
 
  constructor(private firestore: Firestore) {}

  getWorkOrders(sortBy: string = 'created'): Observable<WorkOrder[]>{
    const workOrderRef = collection(this.firestore,'WorkOrders');
    return (collectionData(workOrderRef, {idField: 'id'}) as Observable<WorkOrder[]>).pipe(map(workorders=> workorders.sort((a,b)=> -a[sortBy as keyof WorkOrder].localeCompare(b[sortBy as keyof WorkOrder]))))
  }

  getWorkOrderById(id: string): Observable<WorkOrder>{
    const workOrderRef = doc(this.firestore, `WorkOrders/${id}`);
    return docData(workOrderRef, {idField: 'id'}) as Observable<WorkOrder>
  }

  addWorkOrder(workOrder: WorkOrder){
    const workOrderRef = collection(this.firestore, 'WorkOrders');
    return addDoc(workOrderRef, workOrder)
  }

  deleteWorkOrder(id: string){
    const workOrderRef = doc(this.firestore, `WorkOrders/${id}`);
    return deleteDoc(workOrderRef)
  }

  updateWorkOrder(workOrder: WorkOrder){
    const workOrderRef = doc(this.firestore, `WorkOrders/${workOrder.id}`);
    return updateDoc(workOrderRef, {...workOrder})
  }



  // updateWorkOrdersData(){
  //   const workOrderRef = collection(this.firestore,'WorkOrders');
  //   (collectionData(workOrderRef, {idField: 'id'}) as Observable<WorkOrder[]>).subscribe((workorders => {
  //     workorders.forEach(async workOrder=>{
  //       const data: WorkOrder = {
  //         ...workOrder,
  //         status: 'Completed'
  //       }
  //       await this.updateWorkOrder(data)
  //     })
  //   }))
  // }

}
