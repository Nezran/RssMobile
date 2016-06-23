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

$('#articles').live("pageinit", function () { // or pageshow

//// $(this).html("loading...");
//    var template = $(this).html();
//    var content = $(this);
//    feednami.load(sessionStorage.Articles, function (result) {
//        // console.log(template);
//        // console.log(result);
//        if (result.error) {
//            console.log(result.error);
//        } else {
//            data = result.feed.entries;
//            Rsscontent = {
//                data: data
//            };
//            console.log(Rsscontent);
//            content.html(Mustache.render(template, Rsscontent));
//        }
//    });
});


$(document).on("pageshow", "#articles", function (event) { // When entering pagetwo

    //$(this).html("loading...");

    //if(!sessionStorage.Template) sessionStorage.Template = $(this).html();

    sessionStorage.removeItem("Article");
    var content = $(this);
    var data = {};
    feednami.load(sessionStorage.Articles, function (result) {
        if (result.error) {
            console.log(result.error);
        } else {
            data = {
                data: result.feed.entries,
                index: function () {
                    return data.data.indexOf(this);
                }
            };

            content.html(Mustache.render(window.template['articles'], data));
        }
    });
});

$(document).on("pageshow", "#article", function () { // When entering pagetwo

    var content = $(this);
    var data = {};
    feednami.load(sessionStorage.Articles, function (result) {

        if (result.error) {
            console.log(result.error);
        } else {
            data = {
                data: result.feed.entries[sessionStorage.Article]

            };

            content.html(Mustache.render(window.template['article'], data));
        }
    });

});

jQuery("#article").on("pagehide", function (event) {
    sessionStorage.Article = null;
});

$(document).on("pageshow", "#favoris", function () { // When entering pagetwo

    $(this).html(Mustache.render($(this).html(), JSON.parse(localStorage.favoris || "{}")));
    window.refresh();
});

$(document).on("pageshow", "#index", function () { // When entering pagetwo

    sessionStorage.removeItem("Articles");

    data = {
        categories: categories
    };

    console.log(data);

    //console.log(data);

    $(this).html(Mustache.render($(this).html(), data));

    //$(this).find('#render').html(Mustache.render(template['index'], {categories: categories}));
});
$(document).on('pageinit', function () {


    window.template = [];
    $('[data-role=page]').each(function () {
        var id = $(this).attr("id");
        var content = $(this).html();
        window.template[id] = content;
    });

    $('#index').on('click', 'a.articles', function () {

        sessionStorage.Articles = this.getAttribute('data-url');

    });

    $('#articles').on('click', 'a.article', function () {

        sessionStorage.Article = this.getAttribute('data-url');

    });

    $('#favoris').on('click', 'a.delete_favoris', function () {

        localStorage.removeItem("favoris");
        location.reload();


    });




    window.favoris = [];

    $('#articles').on('click', 'a.favoris', function () {

        var data = [];
        data = $(this).parent().html();

        //console.log(data);

        //var all = JSON.parse(localStorage.favoris);
        var jsonify = {items: [data]};

        //console.log(jsonify);

        if (localStorage.favoris == null) {
            add_item(jsonify);
        } else {
            var all = [];
            all = JSON.parse(localStorage.favoris);
            var doublon = false;
            $.each(all.items, function (index, value) {
                if (value == data) {
                    doublon = true;
                }
            });
            if (doublon == false) {
                all.items.push(data);
                add_item(all);
            }
        }

        function add_item(value) {
            localStorage.favoris = JSON.stringify(value);
            console.log(localStorage.favoris);
        }

    });

});




