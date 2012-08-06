JQuery Facebook Traffic Driver
========================

Description
-----------
This plugin will take your Facebook presence to new heights. Its elegant look and realtime stats will make people feel like they are making a difference. The like status is stored in a cookie so you have the option of enforcing the user to "like" you before they can access content. You can also set a timer on the popup to show for an set period of time before it hides itself.

Usage
-----
1. Include the latest copy of Jquery in your <head></head> tag. Jquery can be found at 'http://www.jquery.com'.
2. Include the 'facebooktrafficdriver.js' in your <head></head> tag after Jquery.

3. Include the 'facebooktrafficdriver.css' in your <head></head>.

4. Next, write a JavaScript function that calls the plugin.

See example below:
	$(document).ready(function(){
		$("body").facebooktrafficdriver();
	});

Settings
---------

***** url
This is the address to the page that will associated with Facebook. ie: http://facebook.com/blueprintinteractive

***** headline
This should be a punchy headline that introduces your call to action.
	
***** descr
This should be a one sentence description.

***** stream 
This will activate a realtime stream of the current number of likes. A value of 1 for true and 0 for false.

***** required
This will make it mandatory to click the like button in order to view the page. A value of 1 for true and 0 for false.

***** delay 
This will activate a timer that will cause the popup to hide itself after it expires. This should be a value from 0-99.



Version history
---------------

Version 1.0 
+++++++++++
Initial release 


Contact Information
-------------------------------
Author: Nick Rivers
