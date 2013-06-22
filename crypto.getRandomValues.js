/*
 * 
 * This script is (c) by Smart In Media GmbH & Co. KG, Germany, http://www.smartinmedia.com
 * LICENSE: LESSER GPL, so you can share / distribute commercially and non-commercially
 * with keeping this copyright notice 
 *
 * 
 * openpgp.js-crypto.getRandomValues
=================================

OpenPGP.js currently does not support browsers, which dont have the crypto.getRandomValues() function. This adds it.

!!!! ONE IMPORTANT NOTE:
THIS SCRIPT USES THE FORTUNA-PSEUDO-RANDOM-NUMBER-GENERATOR FROM 
https://github.com/wxfz/fortuna
WE CANNOT GUARANTEE YOU THAT THIS IS CRYPTOGRAPHICALLY SAFE!!
YOU'RE DEALING ON YOUR OWN RISK WITH THAT. WE DON'T TAKE ANY LIABILITY!!!!

!!!!


This is how it works:

1. Implement openpgp.js in your source (please see the great openpgp.js for a detailed description and for expamples).
2. On your HTML/PHP-documents, FIRST include jquery, THEN include fortuna.js (from here), THEN include crypto.getRandomValues.js, THEN include the openpgp.js-libraries
3. Then it should work. Please note: Internet Explorer has a problem with "localStorage", if you work offline (file:///...), it only works with http://

<script src="./javascript/jquery.js" type="text/javascript" charset="utf-8"></script>
<script src="./javascript/fortuna.js" type="text/javascript" charset="utf-8"></script>
<script src="./javascript/crypto.getRandomValues.js" type="text/javascript" charset="utf-8"></script>
...then here all the openpgp.js stuff
 
 * 
 */

if (typeof window.crypto==='undefined'){
        console.log("Browser does not natively support crypto!");
          window.crypto = new Object();
    }

if (typeof window.crypto.getRandomValues==='undefined') {
    //If browser does not have the crypto.getRandomValues function, we need to make our own PRNG
    console.log("Browser does not natively support crypto.getRandomValues(buf)!!");
    console.log(window.crypto);
    
    if($.browser.msie){ //If browser is Microsoft Internet Explorer, it does not know __proto__ --> IE really sucks...
        window.crypto.getRandomValues = function (arr){
            for (var i = 0; i < arr.length; i++) { //Go through the array
                var buf = new Uint32Array(1);
                var rbyte = wxfz.fortuna.generate(4);//We now generate 4 bytes --> 32 bits
                for (var i=0; i<3; i++){ //Go through the 4 bytes and concetenate them to 1 32bit-number
                    buf[0] = buf[0] + rbyte.charCodeAt(i); buf[0] = buf[0]*256;
                }
                buf[0] = buf[0] + rbyte.charCodeAt(3);
                arr[i] = buf[0]; //
            }

        };
    }
    else { //If other browser, not IE
        window.crypto.__proto__.getRandomValues = function (arr){
            for (var i = 0; i < arr.length; i++) { //Go through the array
                var buf = new Uint32Array(1);
                var rbyte = wxfz.fortuna.generate(4);//We now generate 4 bytes --> 32 bits
                for (var i=0; i<3; i++){ //Go through the 4 bytes and concetenate them to 1 32bit-number
                    buf[0] = buf[0] + rbyte.charCodeAt(i); buf[0] = buf[0]*256;
                }
                buf[0] = buf[0] + rbyte.charCodeAt(3);
                arr[i] = buf[0]; //
            }

        };    
    }
    
    
    console.log('Doing it');    
    if (window.crypto.getRandomValues) {
        console.log('Now it supports crypto.getRandomValues!');
    }    
    
        //console.log ('In this function with '+arr);
}
else {
    console.log('The crypto object: '+window.crypto);
}
