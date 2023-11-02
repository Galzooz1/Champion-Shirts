import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';

interface PaypalBtnProps {
    successFunc: (orderID: any) => Promise<void>;
    total: number | string;
    clientId: string;
};

const PaypalBtn: React.FC<PaypalBtnProps> = ({successFunc, total, clientId}) => {
    return(
        <div>
        <PayPalButton
        currency="ILS"
          amount={total}
          
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={(details: any, data:any) => {
            successFunc(data.orderID);
          }}  
  
          options={{
            clientId: clientId
          }}
        />
        {/* 
        חובה להכניס את הקוד הבא בעמוד בית כמובן לשנות את הקליינט איי די בהתאם
         <script src="https://www.paypal.com/sdk/js?client-id=ATEBdkrqMVXj65AczPrXBZbvNgUecBBNkoH0sB4OnzTYJPIGrkTIsG4ev_Z4mCumVd3dN_YBhQGEH3PW&currency=ILS" ></script>
        */}
      </div> 
    )
}

export default PaypalBtn