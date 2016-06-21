/**
 * Created by Mickael.LACOMBE on 17.06.2016.
 */



var categories = [
    {name: "Accueil", url: "http://www.20min.ch/rss/rss.tmpl?type=channel&get=6&lang=ro"},
    {name: "Actualités", url: "http://www.20min.ch/rss/rss.tmpl?type=channel&get=17&lang=ro"},
    {name: "Suisse", url: "http://www.20min.ch/rss/rss.tmpl?type=rubrik&get=313&lang=ro"},
    {name: "Monde", url: "http://www.20min.ch/rss/rss.tmpl?type=rubrik&get=312&lang=ro"},
    {name: "Economie", url: "http://www.20min.ch/rss/rss.tmpl?type=rubrik&get=316&lang=ro"},
    {name: "Faits divers", url: "http://www.20min.ch/rss/rss.tmpl?type=rubrik&get=318&lang=ro"},
    {name: "Vaud", url: "http://www.20min.ch/rss/rss.tmpl?type=rubrik&get=315&lang=ro"},
    {name: "geneve", url: "http://www.20min.ch/rss/rss.tmpl?type=rubrik&get=314&lang=ro"},
    {name: "Romandie", url: "http://www.20min.ch/rss/rss.tmpl?type=rubrik&get=784&lang=ro"},
    {name: "People", url: "http://www.20min.ch/rss/rss.tmpl?type=channel&get=22&lang=ro"},
    {name: "Sport", url: "http://www.20min.ch/rss/rss.tmpl?type=channel&get=23&lang=ro"},
    {name: "Hi-tech", url: "http://www.20min.ch/rss/rss.tmpl?type=channel&get=20&lang=ro"},
    {name: "Sortir", url: "http://www.20min.ch/rss/rss.tmpl?type=rubrik&get=526&lang=ro"}
];

//var template = [];
//
//
//// Récupère les data-template du dom index
//$(document).on('pageinit', function () {
//    $("[data-template]").each(function () {
//        var name = $(this).attr("data-template");
//        var content = $(this).html();
//        template[name] = content;
//        $(this).remove();
//    });
//});


//<ul>{{#categories}}<li>{{name}}</li>{{/categories}}</ul>

//$.ajax({
//    type: "GET",
//    url: "http://feeds2.feedburner.com/LeJournalduGeek.xml",
//    dataType: "xml",
//    success: function (data) {
//        console.log(data);
//    }
//});
//
//function parseXml(xml) {
//    dataxml = null;
//    $(xml).find("item").each(function () {
//        title = $(this).find("title").text();
//        description = $(this).find("description").text();
//        dataxml += title + " " + description + "";
//    });
//    $('#resultxml').html($data);
//}




$(document).on("pageshow", "#articles", function () { // When entering pagetwo

    // $(this).html("loading...");
    var template = $(this).html();
    var content = $(this);
    feednami.load(sessionStorage.Url,function(result){
        // console.log(template);
        // console.log(result);
        if(result.error) {
            console.log(result.error);
        } else {
            data = result.feed.entries;
            Rsscontent = {
                data: data
            };
            console.log(Rsscontent);
            content.html(Mustache.render(template,Rsscontent));
        }
    });
    //alert('Parameter url: ' + sessionStorage.Url);

    //console.log(data);
    //alert(data.prevPage.attr('id'));
});

$(document).on("pageshow", "#article", function () { // When entering pagetwo

    var template = $(this).html();
    var content = '<iframe width="100%" height="1000px" src="'+sessionStorage.Url+'"></iframe>';
    // $(this).html(content);
    $('#iframe1').contents().find('html').attr('src',sessionStorage.Article);

    //alert('Parameter url: ' + sessionStorage.Url);

    //console.log(data);
    //alert(data.prevPage.attr('id'));
});

$(document).on("pageshow", "#index", function () { // When entering pagetwo

    data = {
        categories: categories
    };

    console.log(data);

    $(this).html(Mustache.render($(this).html(),data));

    //$(this).find('#render').html(Mustache.render(template['index'], {categories: categories}));
});

// console.log($test.text());


