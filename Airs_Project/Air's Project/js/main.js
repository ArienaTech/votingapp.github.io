var loggedIn = false,votes = 3;

function login(){
    let tos = document.querySelector("#c_tos"),
    check = document.querySelector(".check");
    
    if(tos.checked){
        loggedIn=true;
        switchPage(2);
    }else {
        return check.setAttribute('style','border:2px solid red;');
    }
}

function switchPage(num){
    if(num===1){
        if(loggedIn){
            /*switchPage(2);*/
        }else{
            $(".page").replaceWith(`
            <div class="page" id="home">
                <div class="top"><p>Vote for<br/><span>Miss Five Crowns</span></p></div>
                <div class="bot">
                    <div class="logins">
                        <p id="lg">New Zeland's most amazing women are embarking on an unforgetable journey</p>
                        <div id="i_fb" onclick="login()"><p>connect with facebook</p></div>
                        <div id="i_mail" onclick="login()"><p>Connect with gmail</p></div>
                    </div>
                    <div class="tos">
                        <label><input type="checkbox" id="c_tos"/><span class="check"></span></label>
                        <p>By checking this box, you agree to the <a href="">Terms of Use</a> and <a href="">Privacy Policy</a>.</p>
                    </div>
                </div>
            </div>
            `)
        }
    }else if(num===2){
        $(".page").replaceWith(`
            <div class="page">
                <nav>
                    <ul>
                        <li><a onclick="switchPage(1)" id="i_home"></a></li>
                        <li><a onclick="switchPage(2)" id="i_news" class="active"></a></li>
                        <li><a onclick="switchPage(3)" id="i_contestants"></a></li>
                        <li><a onclick="switchPage(4)" id="i_profile"></a></li>
                    </ul>
                </nav>
                <div class="page_content">
                <div class="news">
                    <p>2020 <span>NEWS</span></p>
                </div>
                </div>
            </div>
        `)
        $.getJSON( "../data/people.json", function(data){
            data.news.forEach(e=>{
                $('<img>',{
                    'src':e
                }).appendTo(".news");
            });
        });
    }else if(num===3){
        $(".page").replaceWith(`
            <div class="page">
                <nav>
                    <ul>
                        <li><a onclick="switchPage(1)" id="i_home"></a></li>
                        <li><a onclick="switchPage(2)" id="i_news"></a></li>
                        <li><a onclick="switchPage(3)" id="i_contestants" class="active"></a></li>
                        <li><a onclick="switchPage(4)" id="i_profile"></a></li>
                    </ul>
                </nav>
                <div class="page_content">
                    <div class="cont"></div>
                </div>
            </div>
        `)
        $.getJSON( "../data/people.json", function(data){
            data.contestants.forEach(e=>{
                $('<li>',{
                    'class': 'p_wrap',
                    'html': $('<div>',{
                        'class':'p_img',
                        'style':'background:url('+e.picture+') center;'
                    })
                    .add($('<div>',{
                        'class':'p_info',
                        'html':$('<span>',{
                            'class':'p_name',
                            'html':e.name
                        })
                        .add($('<span>',{
                            'class':'p_score',
                            'id': 'usr_'+data.contestants.indexOf(e),
                            'html':'Score: '+e.score
                        }))
                        .add($('<span>',{
                            'class':'p_job',
                            'html':e.job
                        }))
                        .add($('<div>',{
                            'class':'p_view',
                            'html':'VIEW',
                            'onclick':'view('+data.contestants.indexOf(e)+')'
                        }))
                        .add($('<div>',{
                            'class':'p_vote',
                            'html':'VOTE',
                            'onclick':'vote('+data.contestants.indexOf(e)+')'
                        }))
                    }))
                }).appendTo(".cont");
            });
        });
    }else if(num===4){
        $(".page").replaceWith(`<div class="page">
            <nav>
                <ul>
                    <li><a onclick="switchPage(1)" id="i_home"></a></li>
                    <li><a onclick="switchPage(2)" id="i_news"></a></li>
                    <li><a onclick="switchPage(3)" id="i_contestants"></a></li>
                    <li><a onclick="switchPage(4)" id="i_profile" class="active"></a></li>
                </ul>
            </nav>
            <div class="page_content">
                <div class="pr_user"></div>
            </div>
        </div>`)
        $.getJSON( "../data/people.json", function(data){
            $('<div>',{'class': 'pr_top',
                'html':$('<img>',{
                    'src':data.user.picture
                }).add($('<h1>',{
                    'html':data.user.first+' '+data.user.last
                })).add($('<p>',{
                    'html':'@'+data.user.username
                }))
            }).add($('<div>',{'class':'pr_score',
                'html':'Votes Remaining: '+votes
            })).add($('<div>',{'class':'pr_info',
                'html':$('<p>',{'html':'Email'})
                .add($('<span>',{'html':data.user.email}))
                .add($('<p>',{'html':'Phone'}))
                .add($('<span>',{'html':data.user.phone}))
            })).appendTo(".pr_user");
        })
    }else return;
}

function view(u){
    $(".page").replaceWith(`<div class="page">
        <nav>
            <ul>
                <li><a onclick="switchPage(1)" id="i_home"></a></li>
                <li><a onclick="switchPage(2)" id="i_news"></a></li>
                <li><a onclick="switchPage(3)" id="i_contestants" class="active"></a></li>
                <li><a onclick="switchPage(4)" id="i_profile"></a></li>
            </ul>
        </nav>
        <div class="page_content">
            <div class="u_profile"></div>
        </div>
    </div>`)
    
    $.getJSON( "../data/people.json", function(data){
        let user = data.contestants[u];
        $('<div>',{
            'class': 'u_wrap',
            'html':$('<div>',{
                'class':'u_img',
                'style':'background:url('+user.picture+');',
                'html':$('<div>',{
                    'class':'u_tags',
                    'html':$('<h1>',{
                        'class':'u_name',
                        'html': user.name
                    })
                    .add($('<p>',{
                        'class':'u_tag',
                        'html':'Miss Five Crowns Nz'
                    }))
                })
            })
        }).appendTo(".u_profile");
        user.profile.forEach(e=>{
            $('<div>',{
                'class':'u_img2',
                'style':'background:url('+e+') center;'
            }).appendTo(".u_wrap");
        })
    })
}

function vote(u){
    if(!votes>0) return alert("You have used all your votes");
    $.getJSON( "../data/people.json", function(data){
        let user = data.contestants[u];
        $("#usr_"+u).html('Score: '+ ++user.score);
        votes--
    });
}