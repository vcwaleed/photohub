import React from 'react'
import'./rates.css';
function Rates() {
  return (
   <>
   
   <div>
      <div className='tables-container'>
        <div className='tables-content'>
          <table className="table-fixed">
            <thead>
              <tr>
                <th>Select</th>
                <th>Image Type</th>
                <th>Resolution</th>
                <th>Dimensions</th>
                <th>Size</th>
                <th>Price</th>
                <th>File Format</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td>SMALL</td>
                <td>300DPI</td>
                <td>1260x1890</td>
                <td>4.2x 6.3</td>
                <td>16,000</td>
                <td>JPEG</td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>MEDIUM</td>
                <td>300DPI</td>
                <td>2700x4050</td>
                <td>9x13.5</td>
                <td>24,000</td>
                <td>JPEG</td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>LARGE</td>
                <td>300DPI</td>
                <td>2700x4050</td>
                <td>9x13.5</td>
                <td>32,000</td>
                <td>TIFF</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <button className='b-cart'>Add To Cart</button>
        <br />
        <br />
      </div>
      
      <div className='tables-container2'>
        <div className='tables-content2'>
        <p><strong>Small Size Pack</strong></p>
          <table className="table-fixed2">
            <thead>
              <tr>
                <th>Select</th>
                <th>Images/Videos</th>
                <th>Discount</th>
                <th>Price (.Rs)</th>
                <th>Per Image/Videos  (.Rs)</th>
                <th>Download With</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td>10</td>
                <td>25%</td>
                <td>120,000</td>
                <td>12000</td>
                <td>90 days</td>
              </tr>
              <tr> 
                <td><input type="checkbox" /></td>
                <td>20</td>
                <td>30%</td>
                <td>120,000</td>
                <td>12000</td>
                <td>90 days</td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>30</td>
                <td>35%</td>
                <td>1,248,000</td>
                <td>10400</td>
                <td>365 days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <button className='b-cart'>Subscribe</button>
        <br />
        <br />
      </div>
      
      <div className='tables-container3'>
        <div className='tables-content3'>
        <p><strong>Large Size Pack</strong></p>
         <table className="table-fixed3">
            
            <thead>
              <tr>
                <th>Select</th>
                <th>Images/Videos</th>
                <th>Discount</th>
                <th>Price (.Rs)</th>
                <th>Per Image/Videos  (.Rs)</th>
                <th>Download With</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td>10</td>
                <td>25%</td>
                <td>120,000</td>
                <td>12000</td>
                <td>90 days</td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>20</td>
                <td>30%</td>
                <td>120,000</td>
                <td>12000</td>
                <td>90 days</td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td>30</td>
                <td>35%</td>
                <td>1,248,000</td>
                <td>10400</td>
                <td>365 days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <button className='b-cart'>Subscribe</button>
        <br />
        <br />
      </div>
      
      <div className="terms-and-conditions">
        <div className="shadow">
          <p><strong>Terms and Conditions:</strong></p>
          <ul>
            <li>Taxes extra (as applicable)</li>
            <li>Downloaded videos/images will not be returned/replaced</li>
            <li>Please read the End-User License Agreement for usage of the images/videos</li>
            <li>100% Money Back Guarantee: All the Subscription Packs mentioned above come with a 100% Money Back Guarantee. The refund will only be processed if you have not downloaded even a single image/video during the Subscription period.</li>
            <li>The downloaded images/videos can be used for Lifetime.</li>
            <li>Images cannot be downloaded once the purchased pack is expired.</li>
            <li>The remaining images will be carry forwarded automatically to the new pack on renewal before the expiry date.</li>
          </ul>
        </div>
      </div>
    </div>
   
   </>
  )
}

export default Rates
