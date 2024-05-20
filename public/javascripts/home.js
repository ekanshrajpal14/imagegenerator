
const dotenv = require('dotenv').config();

// popup scene 

// var showme = document.querySelectorAll("#showme");
// showme = [...showme];
// showme.forEach(function (elem) {
//     elem.addEventListener("mouseenter", function (dets) {
//         if (dets.target.dataset.name == 1) {
//             document.querySelector(".extra").style.opacity = "1";
//             document.querySelector(".extra").style.display = "flex";
//         }
//         else {
//             document.querySelector(".extra2").style.opacity = "1";
//             document.querySelector(".extra2").style.display = "flex";

//         }

//     })
//     elem.addEventListener("mouseleave", function (dets) {
//         if (dets.target.dataset.name == 1) {
//             document.querySelector(".extra").style.opacity = "0";
//             document.querySelector(".extra").style.display = "none"
//         }
//         else {
//             document.querySelector(".extra2").style.opacity = "0";
//             document.querySelector(".extra2").style.display = "none"
//         }
//     })

// });

var tl = gsap.timeline();
// function ShowAnimation() {

//     tl.from(".light", {
//         x: "-10vw",
//         opacity: 0,
//         ease: Expo.easeInOut,
//         duration: 1,
//     })
//         .from(".design", {
//             y: 30,
//             opacity: 0,
//             delay: -.5,
//             ease: Expo.easeInOut,
//             duration: 1,
//         })
//         .from(".aura", {
//             x: "-20vw",
//             opacity: 0,
//             ease: Expo.easeInOut,
//             delay: -1,
//             duration: 1.5,
//         })
//         .from(".shopnow", {
//             x: "-20vw",
//             opacity: 0,
//             ease: Expo.easeInOut,
//             delay: -1.4,
//             duration: 1.5,
//         })


// }










var currentshowing = 1;


function nav() {
    gsap.from(".navigation", {
        y: -100,
        ease: "power3",
        opacity: 0,
        duration: 2,
    })
}
nav()

var showinginterval;



var over = 0;

// document.getElementById("more").addEventListener("click", function () {

//     if (over == 0) {
//         document.querySelector(".overlayer").style.width = "100%";
//         document.querySelector(".textcontent").style.display = "flex";
//         document.querySelector(".overlayer").style.backgroundColor = "#D0E8E4";

//         // document.querySelectorAll("#same").style.opacity="1"
//         over = 1
//     }
//     else {
//         document.querySelector(".overlayer").style.width = "0%";
//         // document.querySelectorAll("#same").style.opacity = "0"
//         document.querySelector(".overlayer").style.backgroundColor = "#000";


//         document.querySelector(".textcontent").style.display = "none";

//         over = 0;


//     }
// })








button.addEventListener('click', async () => {
    document.querySelector("#ipt-tag").value;
    let data = document.querySelector('#ipt-tag').value;
    console.log(data);
    if (data == '') { alert('Please enter a text'); }
    else {
        // const axios = require('axios');

        const options = {
            method: 'POST',
            url: 'https://ai-text-to-image-generator-api.p.rapidapi.com/cyberpunk',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': "cb622480f4msha9b2d7507d955f3p173525jsn10b0bbf67dd3",
                'X-RapidAPI-Host': 'ai-text-to-image-generator-api.p.rapidapi.com'
            },
            data: {
                inputs: `${data}`
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            document.querySelector('.textimage').src = `${response.data.url}`;
            document.querySelector("#displayimage").style.display = "none"
            document.querySelector(".textimage").style.display = "block"
            var imgUrl = response.data.url;
            var collection = document.querySelector(".collection");
            collection.style.display = "block";
            collection.setAttribute('data-url', imgUrl);

            axios.get(`/history/${data}`).then(function (e) {
                console.log(e.data);
            })
                .catch(function (err) {
                    console.log(err);
                })



        } catch (error) {
            console.error(error);
        }
    }
});

document.getElementById("btnwa").addEventListener('click', () => {
    console.log("juu");
    var idval = document.getElementById("btnwa").getAttribute('data-url');
    console.log(idval);
    const options1 = {
        method: 'POST',
        url: '/addcollection/image',
        headers: {
            'content-type': 'application/json',
            // 'X-RapidAPI-Key': 'cb622480f4msha9b2d7507d955f3p173525jsn10b0bbf67dd3',
            // 'X-RapidAPI-Host': 'ai-text-to-image-generator-api.p.rapidapi.com'
        },
        data: {
            inputs: `${idval}`
        }
    };

    alert('Image added to collection');
    axios.request(options1).then(function (e) {
        console.log(e.data);
    })
});

