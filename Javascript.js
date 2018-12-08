$(document).ready(function(){
			var stuff = new Date();
			var day = stuff.getDay();
			var date = stuff.getDate();
			var month = stuff.getMonth();
			var year = stuff.getFullYear();
			var v = date%7;
			var fom;
			var setday;
			var i=month;
			var monthname = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			var nod = [31,28,31,30,31,30,31,31,30,31,30,31];
			var chep = ['Sunday', 'Monday', 'Tuesday', 'Wednessday', 'Thursday', 'Friday', 'Saturday']

			/*-------------------------------------------------------------*/

			$('.header > span').text(monthname[i] + ' - ' + year);

			/*-------------------------------------------------------------*/

			var sampday = day;
			if (sampday<v && sampday!=0){
				fom = (8+sampday) - v;
			}
			else if (sampday>v && sampday!=0){
				fom = (sampday-v)+1;		
			}
			else{
				fom=(8-v)%7;
			};

			var cfom = fom;
			
			/*-------------------------------------------------------------*/

			
			var setday=1;
			if (year%4==0) {
				nod[1]=29;
			}
			else{
				nod[1]=28;
			};
			for (fom; fom <= ((cfom-1)+nod[month]); fom++){
				$('tr.row-1'+ ' ' + 'td.b-' + fom).text(setday);
				setday++;
			}

			/*-------------------------------------------------------------*/

			$('.next').click(function (){
				// feb month in leap year
				if (year%4==0) {
					nod[1]=29;
				}
				else{
					nod[1]=28;
				};
				// first of month
				fom = (cfom + (nod[month])%7)%7;
				// month
				if (month<11) {
					month++;
				}
				else{
					month = 0;
				};
				
				cfom = fom;
				setday=1;
				//  year

				if (i<11) {
					i++;
				}
				else{
					i=0;
					year++;
				};

				$('.header > span').text(monthname[i] + ' - ' + year);
				for (setday; setday <= nod[month]; setday++){
					$('tr.row-1'+ ' ' + 'td.b-' + fom).text(setday);
					fom++;
				}
				$('td.b-' + (fom-1)).nextAll().html('&nbsp;');
				fom = nod[month]+1;
				$('td.b-' + cfom).prevAll().html('&nbsp;');

				$("td").removeClass("high");
			});

			/*-------------------------------------------------------------*/

			$('.prev').click(function (){
				// feb month in leap year
				if (year%4==0) {
					nod[1]=29;
				}
				else{
					nod[1]=28;
				};
				setday=1;

				//month
				if (month!=0) {
					month--;
				}
				else{
					month = 11;
				}

				// first of month
				var edate;
				var eday;
				var n;
				edate = nod[month];

				if (cfom!=0) {
					eday = cfom-1;
				}
				else{
					eday = 6;
				}
				n = edate%7;
				if (eday>=n && eday!=0) {
					fom=eday-(n-1);
				}
				else if (eday<n && eday!=0) {
					fom=n-(eday+1);
					if (n==3 && eday==1) {
						fom=6;
					}
				}
				else{
					fom=(8-n)%7;
				}
				cfom=fom;

				if (i>0) {
					i--;
				}
				else{
					i=11;
					year--;
				}
				$('.header > span').text(monthname[i] + ' - ' + year);
				for (fom; fom <= ((cfom-1)+nod[month]); fom++){
					$('tr.row-1'+ ' ' + 'td.b-' + fom).text(setday);
					setday++;
				}

				$('td.b-' + cfom).prevAll().html('&nbsp;');
				$('td.b-' + (fom-1)).nextAll().html('&nbsp;');
				fom = nod[month]+1;
				$("td").removeClass("high");
			});

			/*-------------------------------------------------------------*/

			//$("td:contains('" + date + "')").addClass("high");
			$("td:contains('" + date + "')").filter(function() {return $(this).text() == date;}).addClass('high')
			$('td').click(function(){
				$(this).addClass('high').siblings().removeClass('high');
			});


			/*-------------------------------------------------------------*/

			$(".gd").click(function() {
				$(".go-to").addClass('hide');
			});
			$(".close").click(function() {
				$(".go-to").removeClass('hide');
			});

			/*-------------------------------------------------------------*/
			var gomonth;
			var godate;
			$(".sel-month").mouseleave(function() {
				gomonth = $( '.sel-month' ).val();
				if ($('.sel-date').children().length == 0){
					$('.sel-date').children().remove();
					for (var s = 1; s <= nod[gomonth]; s++) {
						$('.sel-date').append('<option value=' + s + '>' + s + '</option>');
					}
				}
			});
			$(".sel-date").mouseleave(function() {
				godate = $('.sel-date').val();
			});

			$(".go").click(function() {
				year = $('.sel-year').val();
				month = gomonth;
				date = godate;
				var newdate = new Date(year,month,date);
				var newday = newdate.getDay();
				$(".go-to").removeClass('hide');
				var sampday = newday;
				v=godate%7;
				if (sampday>=v && sampday!=0) {
					fom=sampday-(v-1);
				}
				else if (sampday<v && sampday!=0) {
					fom=v-(sampday+1);
					if (v==3 && sampday==1) {
						fom=6;
					}
				}
				else{
					fom=(8-v)%7;
				}

				var cfom = fom;
				i=gomonth;
				var setday=1;
				if (year%4==0) {
					nod[1]=29;
				}
				else{
					nod[1]=28;
				}
				for (fom; fom <= ((cfom-1)+nod[month]); fom++){
					$('tr.row-1'+ ' ' + 'td.b-' + fom).text(setday);
					setday++;
				}

				$('td.b-' + cfom).prevAll().html('&nbsp;');
				$('td.b-' + (fom-1)).nextAll().html('&nbsp;');
				$('.header > span').text(monthname[i] + ' - ' + year);
				$.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
					return function( elem ) {
						return $(elem).text().match("^" + arg + "$");
					};
				});

				$("td").removeClass("high");
				$("td:textEquals('" + godate + "')").addClass("high");
				$('.d1').text(cfom);
				$('.d2').text(fom);
			});
		});