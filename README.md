openpgp.js-crypto.getRandomValues
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

 * The crypto.getRandomValues.js script is (c) by Smart In Media GmbH & Co. KG, Germany, http://www.smartinmedia.com
 * LICENSE: LESSER GPL, so you can share / distribute commercially and non-commercially
 * with keeping this copyright notice
 
