var express=require("express");
var passport=require("passport");

var middleware = require("../middleware/index");
var router=express.Router({mergeParams: true});


const checksum_lib=require("../paytm/checksum/checksum");


router.get("/payment",middleware.isloggedin,function(req,res){
    let params={}
    params['MID']='PafhkC08108295167919',
    params['WEBSITE']='DEFAULT',
    params['CHANNEL_ID']='WEB',
    params['INDUSTRY_TYPE_ID']='Retail',
    params['ORDER_ID']="Merchant"+Math.random().toString(36).substring(2,15),
    params['CUST_ID']=String(req.user.username)+Math.random().toString(36).substring(2,15),
    params['TXN_AMOUNT']='1',
    params['CALLBACK_URL']='/campgrounds',
    params['EMAIL']='ajindal_be18@thapar.edu',
    params['MOBILE_NO']='9050995986'

    checksum_lib.genchecksum(params,'_IFq1ytY9gWQ&8jZ',function(err,checksum){
        let txn_url="https://securegw.paytm.in/order/process"
        
        let form_fields=""

        for(x in params)
        {
            form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"'/>"
        }

        form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"'/>"

        var html='<html><body><center><h1>Please wait! Do not refresh the page</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields +'</form><script type="text/javascript">document.f1.submit()</script></body></html>'
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write(html)
        res.end()
    })
});


module.exports = router;