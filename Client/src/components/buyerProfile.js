import React, { Component } from 'react';
import '../App.css';
import {profiledata} from './dataProfile';


export default class  extends Component {
  render() {
    

    
    
    return (
      <div className="container main-secction bg-gradient-light">
        <div className="row mh-100%">
            <div className="col-md-12 col-sm-12 col-xs-12 image-section mt-58">
                <img src="http://nicesnippets.com/demo/Nature-Night-Sky-Stars-Blurred-Light-Show-Mountains-WallpapersByte-com-1920x1080.jpg"/>
            </div>
            <div className="col-sm-10  align-items-center">
                <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                    <div className="row ">
                        <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                            <img src="http://nicesnippets.com/demo/1499344631_malecostume.png"/>
                        </div>
                        </div>
                         </div>
                         <div className="mt-5 p-3 ">      
                                    <h3>Buyer Name</h3>                       
                                   </div>
                                   <div className=" ml-5">
                                    <h4>Description</h4>
                                    <div className='textbox  p-3 mt-3 '>
                                        <h5>Lorem ipsum dolor sit amet, etellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc</h5>
                                     </div>
                                   
                                   </div>
            </div>
        </div>
    </div>
    )
  }
}