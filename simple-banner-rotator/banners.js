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

	'force_size':			1,         		// 	if set to 1 all banners will be resized to the width and height in the next to settings; OTHERWISE ORIGINAL WAS SET TO 0
	'img_width':			100,			//	width to resize all banners to, only takes effect if above is 1
//	'img_height':			100, 			// 	height to resize all banners to, only takes effect if above is 1

	'refresh_time':			0,			//	the seconds between refreshs of the banners - use 0 to disable ORIGINALLY WAS 5000
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
// ADD A NEW BANNER FOR EACH CONTENT PIECE THAT SHOULD BE INCLUDED IN RANDOM ROTATION. DELETE FROM HERE AFTER NO LONGER USING A CONTENT PIECE

var banners = [
	new banner('AES Building',			'https://advance.msudenver.edu/makeagift', 			'images/aesbuilding.jpg', 	'30/04/2019',	'', 'Aerospace & Engineering Sciences', 'MSU Denver is embarking on its most ambitious undertaking yet -- to construct an Aerospace Engineering Sciences building with plans to educate and train a globally competitive aviation and advanced manufacturing workforce for the state of Colorado.'),
	new banner('Hospitality Learning Center',	'https://advance.msudenver.edu/makeagift', 		'images/hlc.jpg',		'10/04/2019',	'', 'Hospitality Learning Center', 'Our newly created Hotel and Hospitality Learning Center offers a unique, experiential education thanks to an on-campus Spring Hill Suites, a full-service, 150-room hotel with conference and restaurant amenities.'),
	new banner('Omar Hurricane', 				'https://www.msudenver.edu/magazine/storyarchive/fall-2015/a-perfect-storm.shtml', 	'images/omar_hurricane.jpg',		'30/04/2019',	'', 'A Perfect Storm', 'Alumnus Omar Hurricane is using technology and a laser-sharp focus to uncover new energy sources.'),
	new banner('Graduate', 			'https://advance.msudenver.edu/transform', 	'images/scholarship.jpg', 	'10/04/2019',	'', 'Scholarship News', 'The Transform Tomorrow scholarship campaign is a $6 million effort to increase scholarships for recruitment, retention, and graduation of MSU Denver students.'),
	new banner('Fay Olsgard', 			'https://www.msudenver.edu/magazine/storyarchive/fall-2015/the-skull-without-a-face.shtml', 'images/skulls.jpg', 	'30/04/2019',	'', 'The Skull Without A Face', 'Student Fay Olsgard is atthe center of the formindable MSU Denver network that is helping Costa Ricans to look in the mirror'),
	new banner('Regency Complex',				'http://www.dreamhost.com/r.cgi?259541',	'images/softball.jpg',		'30/04/2019',	'', 'The Regency Athletic Complex at MSU Denver', 'MSU Denver is transforming a blighted plot in Denver&rsquo;s inner city into the Regency Athletic Complex, providing outstanding recreational opportunities to MSU Denver students and to the local community. '),
	new banner('Cristian Solano', 'https://www.msudenver.edu/magazine/unlocking-success.shtml?utm_source=uhomepage&utm_medium=carousel&utm_content=solanocordova&utm_campaign=uhomepagelinks', 'images/cristian-solano.jpg', '30/04/2019', 'top', 'Unlocking Success', 'At MSU Denver, Cristian Solano-Cordova found an open door and a path to opportunity'),
	new banner('Don Byron', 'http://www.msudenver.edu/magazine/storyarchive/spring-2016/music-man.shtml?utm_source=uhomepage&utm_medium=carousel&utm_content=donbyron&utm_campaign=uhomepagelinks', 'images/byron.jpg', '30/04/2019', 'top', 'Learn from a Master', 'Jazz virtuioso Don Byron brings excellence to the bandstand and the classroom'),
	new banner('Diversity at MSU Denver', 'http://www.msudenver.edu/spotlight/diversity/?utm_source=uhomepage&utm_medium=carousel&utm_content=diversitychampion&utm_campaign=uhomepagelinks', 'images/diversity2.jpg', '30/04/2019', 'top', 'Diversity Champion', 'MSU Denver is honored for an unyielding commitment to diversity and inclusion'),
	new banner('', 'http://msudenver.edu/newsroom/news/2016/july/14-girlsinc-camp.shtml', '', '30/04/2019', 'bottom', 'Eureka! Girls Empowered', 'Girls Inc Eureka! STEM Program students visited MSU Denver in June for a month-long summer camp'),
	new banner('', 'http://msudenver.edu/newsroom/news/2016/july/14-kudos.shtml', '', '30/04/2019', 'bottom', 'Kudos', 'MSU Denver student Cristian Solano appointed to the White House Its On Us Student Advisory Committee'),
	new banner('', 'http://msudenver.edu/newsroom/news/2016/july/13-soe-artwork.shtml', '', '30/04/2019', 'bottom', 'Works of Art', 'Young artist work is showcased in a permanent display at the School of Education'),
	new banner('', 'http://msudenver.edu/newsroom/news/2016/july/12-sci-fi-series.shtml', '', '30/04/2019', 'bottom', 'De-mystifying sci-fi', 'Film series blends fact and fiction, art and science'),
	new banner('', 'http://msudenver.edu/newsroom/news/2016/july/12-tech-tuesday-room-reservations.shtml', '', '30/04/2019', 'bottom', 'Tech Tuesday: Start your reservations', 'ITS partnered with the Office of the Registrar to provide a streamlined classroom and computer lab reservation system')
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
	// I ADDED THIS
	this.header=y;
	// I ADDED THIS
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
// ADDED % in the following line
  var f=(settings.force_size==1)?' width="'+settings.img_width+'%" height="'+settings.img_height+'%"':'';
	// ADDED I modified the below line to include the ability to have a heading and caption for each image
  var g='<a href="'+e.url+'" title="'+e.name+'" target="'+settings.window+'" style="text-decoration:none !important;"><img border="0" src="'+e.image+'"'+f+' alt="'+e.name+'" /><br/><h3>'+e.header+'</h3><br/><span>'+e.capt+'</span></a>';
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
