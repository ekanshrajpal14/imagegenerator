
// const dotenv = require('dotenv').config();




function nav() {
    gsap.from(".navigation", {
        y: -100,
        ease: "power3",
        opacity: 0,
        duration: 2,
    })
}
nav()









const button = document.querySelector('.btn-click');



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

