/**
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

	--------------------------------------------------------------------

	Simple banner rotator. Version: 1.4.0
	Download and support: http://www.spyka.net
	(c) Copyright 2008, 2009 spyka Web Group


	For full documentation:  http://www.spyka.net/docs/simple-banner-rotator
	For support:			 http://www.spyka.net/forums


**/

//								EDIT FROM HERE
///////////////////////////////////////////////////////////////////////////////////

/**
		Script settings
**/

var settings = {

	'force_size':			0,         		// 	if set to 1 all banners will be resized to the width and height in the next to settings
	'img_width':			468,			//	width to resize all banners to, only takes effect if above is 1
	'img_height':			60, 			// 	height to resize all banners to, only takes effect if above is 1

	'refresh_time':			5000,			//	the seconds between refreshs of the banners - use 0 to disable
	'refresh_max':			100,				//	maximum number of refreshs on each page load

	'duplicate_banners':	0,				//	keep as 0 to make sure the same banner won't show on the same page. will only take effect
											//  if show_banners(); is used more than once. You must make sure you have enough banners to fill
											//  all the slots else the browser may freeze or give a stack overflow error

	'location_prefix': 		'adLocation-',	//	The prefix of the IDs of the <div> which wraps the banners - this div is generated dynamically.
											//  a number will be added on the end of this string. adLocation- was used by default before version 1.4.x

	'location_class':		'swb',			//  A class to add to all of the <div>s which wrap the banners, ideal to use for styling banners - use .swb img in your CSS

	'window': 				'_self',		//	Window to open links in, _self = current, _blank = new. Use _top if in a frame!

	'default_ad_loc':		'default'		//	The default adLocation. This is assigned to any banners not given an adLocation in the below banner list
											//  There is no real reason to need to change this
}


/**
		Banners
**/
// banner list syntax: new banner(website_name, website_url, banner_url, show_until_date, adlocation),  DATE FORMAT: dd/mm/yyyy
// if you're not using adlocations just leave it empty like '' as in the last example here
// to make sure a banner is always rotating, just set the date far into the future, i.e. year 3000

var banners = [
	new banner('AwesomeStyles',			'http://www.awesomestyles.com', 			'images/4.jpg', 	'30/04/2019',	'', 'caption1', 'moretext1'),
	new banner('Just Free Templates',	'http://www.justfreetemplates.com', 		'images/5.jpg',		'10/04/2019',	'', 'caption2', 'moretext2'),
	new banner('Flashden', 				'http://www.flashden.net/?ref=spykawg', 	'images/3.jpg',		'30/04/2019',	'', 'caption3', 'moretext3'),
	new banner('ThemeForest', 			'http://www.themeforest.net/?ref=spykawg', 	'images/2.jpg', 	'10/04/2019',	'', 'caption4', 'moretext4'),
	new banner('GraphicRiver', 			'http://www.graphicriver.net/?ref=spykawg', 'images/1.jpg', 	'30/04/2019',	'', 'caption5', 'moretext5'),
	new banner('Dreamhost',				'http://www.dreamhost.com/r.cgi?259541',	'images/6.gif',		'30/04/2019',	'', 'caption6', 'moretext6')
]

//         				There is no need to edit below here
///////////////////////////////////////////////////////////////////////////////////
var used=0;
var location_counter=0;
var refresh_counter=1;
var map=new Array();
function banner(a,b,c,d,e,y,z){
  this.name=a;
  this.url=b;
  this.image=c;
  this.date=d;
	this.header=y;
	this.capt=z;
  this.active=1;
  this.oid=0;
  if(e!=''){
    this.loc=e
  }
  else{
    this.loc=settings.default_ad_loc
  }
}
function show_banners(a){
  location_counter=location_counter+1;
  if(a!=''&&a!=undefined){
    map[location_counter]=a
  }
  else{
    map[location_counter]=settings.default_ad_loc
  }
  var b='<div id="'+settings.location_prefix+location_counter+'" class="'+settings.location_class+'"></div>';
  document.write(b);
  display_banners(location_counter)
}
function display_banners(a){
  var b=new Array();
  if(a==''||!a||a<0){
    return
  }
  var c=banners.length;
  if((c==used)&&settings.duplicate_banners==0){
    return
  }
  for(i=0;i<(banners.length);i++){
    banners[i].oid=i;
    if((banners[i].loc==map[a])&&(banners[i].active==1)){
      b.push(banners[i])
    }
  }
  var d=Math.floor(Math.random()*b.length);
  var e=b[d];
  var f=(settings.force_size==1)?' width="'+settings.img_width+'" height="'+settings.img_height+'"':'';
  var g='<a href="'+e.url+'" title="'+e.name+'" target="'+settings.window+'"><img border="0" src="'+e.image+'"'+f+' alt="'+e.name+'" /><br/><span>'+e.header+'</span><br/><span>'+e.capt+'</span></a>';
  var h=new Date();
  var j=e.date;
  j=j.split('/',3);
  var k=new Date();
  k.setFullYear(parseInt(j[2]),parseInt(j[1])-1,parseInt(j[0]));
  if((h<k)&&e.active==1){
    var l=document.getElementById(settings.location_prefix+a);
    if(l==null){
      alert('Oops this doesn\'t exist!')
    }
    else{
      l.innerHTML=g;
      if(settings.duplicate_banners==0){
      banners[e.oid].active=0;used++
      }
    return
    }
  }
  else{
    display_banners(a)
  }
  return
}
function refresh_banners(){
  if((refresh_counter==settings.refresh_max)||settings.refresh_time<1){
    clearInterval(banner_refresh)
  }
  used=0;
  for(j=0;j<(banners.length);j++){
    banners[j].active=1
  }
  for(j=1;j<(location_counter+1);j++){
      display_banners(j)
    }refresh_counter++
  }
  var banner_refresh=window.setInterval(refresh_banners,settings.refresh_time);
