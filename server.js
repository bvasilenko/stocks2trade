//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var scrumbler = require('./investertech-scrumbler');

var winner1day = 'http://www.investertech.com/selects/report.asp?MinPrice=10&MaxPrice=70&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&cNet=on&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=1&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=20&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&GroupBy1=13&by=1&updn=Asc&action=Screen&gy=0&GroupBy=3&prd=p&mknum=4';
var loser1day = 'http://www.investertech.com/selects/report.asp?MinPrice=10&MaxPrice=70&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&cNet=on&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=1&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=20&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&GroupBy1=13&by=1&updn=Asc&action=Screen&gy=0&GroupBy=5&prd=p&mknum=4';
var winner5day = 'http://www.investertech.com/selects/report.asp?MinPrice=10&MaxPrice=70&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&cNet=on&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=0&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=20&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&GroupBy1=13&by=3&updn=Desc&action=Screen&gy=0&GroupBy=3&prd=p1&mknum=4';
var loser5day = 'http://www.investertech.com/selects/report.asp?MinPrice=10&MaxPrice=70&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=2&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=20&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&GroupBy1=13&by=3&updn=Asc&action=Screen&gy=0&GroupBy=5&prd=p1&mknum=4';
var range1day = 'http://www.investertech.com/selects/report.asp?MinPrice=10&MaxPrice=70&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=2&MinNet=1.5&MaxNet=3.0&cRng=on&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=2&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=20&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&GroupBy1=13&by=1&updn=Asc&action=Screen&gy=0&GroupBy=7&prd=p&mknum=4';
var range5day = 'http://www.investertech.com/selects/report.asp?MinPrice=10&MaxPrice=70&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=2&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=20&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&GroupBy1=13&by=25&updn=Desc&action=Screen&gy=0&GroupBy=7&prd=p1&mknum=4';
var newHigh52w = 'http://www.investertech.com/selects/report.asp?MinPrice=10&MaxPrice=70&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&cNet=on&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=1&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=20&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&gy=1&GroupBy1=13&by=3&updn=Desc&action=Screen&GroupBy=1&prd=p&mknum=44';
var newLow52w = 'http://www.investertech.com/selects/report.asp?MinPrice=10&MaxPrice=70&NTD=2&XTD=250&cVolume=on&vsz=s_vol&vszcp=%3E%3D&rVolume=1000&rsz=p_vol&rszcp=%3C%3D&rrVol=1000&NPE=0.0001&XPE=10000&NCAP=1&XCAP=10&NBeta=-100&XBeta=100&NPGR=-100&XPGR=100&ActVol=abs&sVolHiLow=abs%3E&rvVol=200&MinVol=150&MaxVol=300&cNet=on&sNet=gaimpce&ActNet=abs&sNetHiLow=abs%3E&rNet=1&MinNet=1.5&MaxNet=3.0&sRng=pce&ActRng=abs&sRngHiLow=%3E%3D&rRng=1.5&MinRng=1.5&MaxRng=3.0&vwtype=0&maxn=20&sz=0&wt=0&px=4&tp=0&mt=0&ind=nn&ind2=nn&gy=1&GroupBy1=14&by=3&updn=Asc&action=Screen&GroupBy=1&prd=p&mknum=44';
var resultFormat = 'http://finviz.com/screener.ashx?v=111&f=exch_nyse,geo_usa,sh_avgvol_o1000&ft=4&t={TICKERS}&o=-sector';

router.use(express.static(path.resolve(__dirname, 'client')));
router.get('/api/v1/links', function (req, res) {
  scrumbler.getAllTickers([
    winner1day,
    loser1day,
    winner5day,
    loser5day,
    range1day,
    range5day,
    newHigh52w,
    newLow52w,
  ], function (allTickers) {
      res.send({
        links: [{
          text: 'Open in finviz',
          src: resultFormat.replace('{TICKERS}', allTickers.join(',')),
          description: allTickers.join(', '),
        }]
      });
  });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});
