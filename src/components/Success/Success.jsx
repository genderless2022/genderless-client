import React from "react";
import { useSearchParams } from "react-router-dom";
export default function Success(){
    let [params, setParams] = useSearchParams()
let payment_id = params.get('payment_id')
let email = params.get('email')
let status = params.get('status')
let status_detail = params.get('status_detail')
    return (<>
        <div>
            <div>
                Success Status
            </div>
            <div>
                {payment_id}
            </div>
            <div>
                {email}
            </div>
            <div>
                {status}
            </div>
            <div>
                {status_detail}
            </div>
        </div>
    
    </>)
}