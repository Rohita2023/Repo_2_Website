
// chat 
document.getElementById('chatButton').addEventListener('click', function() {
    var chatCard = document.querySelector('.card.card-bordered');
    if (chatCard.style.display === 'none' || chatCard.style.display === '') {
        chatCard.style.display = 'block';
    } else {
        chatCard.style.display = 'none';
    }
});

function exitApp(){
    // redirect to google.com
    window.location.href = "https://www.google.com";
    
}


document.getElementById('closeChat').addEventListener('click', function() {
    document.querySelector('.card.card-bordered').style.display = 'none';
});

// function startChat() {
//     var chatCard = document.querySelector('.card.card-bordered');
//     if (chatCard.style.display === 'none' || chatCard.style.display === '') {
//         chatCard.style.display = 'block';
//     } else {
//         chatCard.style.display = 'none';
//     }
// }

// document.getElementById('closeChat').addEventListener('click', function() {
//     document.querySelector('.card.card-bordered').style.display = 'none';
// });




var name;
var SIBLING_CLICK = false;
// Object mapping each program to its corresponding description
var programDescriptions = {
    "Beti Bachao Beti Padhao Scheme": "This initiative was launched in Haryana on 22nd January 2015 by the Prime Minister of India to guarantee the survival, safety, and education of girls. The initiative intends to tackle the issue of the unequal sex ratio in recent years, raise social awareness, and improve the effectiveness of welfare benefits for girls.",

    "Working Women Hostel Scheme": "The objectives of this scheme are to promote safe and conveniently located accommodation for working women with childcare facilities. It supports construction and expansion of new and existing hostel buildings and allows trainees to stay in hostels if there is available capacity, prioritizing working women; children of working women can also be accommodated.",

    "One-Stop Centre Scheme": "This scheme aims to support women affected by violence in private and public spaces. It provides a range of services under one roof, including medical, legal, psychological, and counseling support. It offers immediate and emergency assistance as well as long-term support.",

    "Women Helpline Scheme": "Launched in April 2015, the Women Helpline scheme aims to provide women who have experienced abuse in either public or private settings with 24*7 emergency assistance. The government introduced a toll-free number (181) for providing quick and emergency assistance.",

    "Mahila Police Volunteers Scheme": "This scheme was introduced in 2016 by the Ministries of Women and Child Development and Home Affairs in all states and UTs. This central government-sponsored program strives to establish a connection between police authority and local communities.",

    "SWADHAR Greh": "This is one of the Indian government schemes for women's empowerment introduced in 2018. This project's primary goals are to ensure social, economic, and health security as well as to offer housing, food, and clothes. This program gives women legal support and empowers them to take the initiative to reintegrate into society.",

    "STEP (Support to Training and Employment Program for Women)": "From 1986–1987, the Ministry of Women and Child Development operated the STEP scheme as a 'Central Sector Scheme.' In December 2014, it underwent revision. It was designed to give women work security and training in skill development.",

    "Mahila Shakti Kendras (MSK)": "Mahila Shakti Kendra, an initiative for women's empowerment started in India in 2017, is one of the well-known schemes for women. It intends to offer women convergent support services at one location so they can grow their talents, find work, and improve their digital literacy.",

    "Rajiv Gandhi National Creche Scheme": "The Indian government has established the National Creche scheme for children of working mothers to provide several amenities. It was introduced in 2006. This initiative offers working mothers with childcare services and promises to enhance their health and nutrition status.",

    "Ujjwala Scheme": "This program was introduced in December 2007. It is an extensive scheme established by the Indian government to suppress trafficking and retrieve, treat, and reintegrate sexually exploited survivors of human trafficking."
};

var chatSampleHTML = `<div class="media media-chat d-flex">
    <img class="avatar" src="./asserts/icon.png" alt="...">
    <div class="media-body" id="chat-body">
    </div>
</div>`;

$("#submit-name").on("click", function (event) {
    event.preventDefault();
    name = $("#user-name").val().trim();

    if (name !== "") {
        // remove #name-input
        $("#name-input").remove();
        howCanIAssistYouToday();
    } else {
        alert("Please enter your name.");
    }
});

function howCanIAssistYouToday() {
    var question = `Hey <b>${name}</b>, How can I assist you today?`;

    // first level options
    var options = [
        "Women Empowerment",
        "Empowerment Programs", 
        "Career Development", 
        "Health and Wellness", 
        "Helpline Assistance"];
    appendToChatBody(question, options);
    

}

function appendToChatBody(question, options) {
    console.log(options);
    if(typeof options === "string"){
        var o1 = `<p class='program'>${options}</p>`;
        var html = o1;
    } else{
        var p1 = `<p>${question}</p>`;
        var o1 = options.map(option => `<p class='option'>${option}</p>`).join("");
        var html = p1 + o1;
    }

    var chatHTML = $(chatSampleHTML); // Create a new jQuery object based on the template
    chatHTML.find(".media-body").html(html); // Use .html() instead of .append() to replace the old content
    console.log(chatHTML);
    $("#chat-content").append(chatHTML); // Append the new chat message at the end of the chat
    addBackToMainChatButton();
}

// Add this function to your option event handler
$(document).on("click", '.option', function () {

    function updateOptionAfterClick() {
        $(this).removeClass("option");
        $(this).addClass("option-selected");
        $(this).addClass("option-clicked");

        // make siblings unclickable once one option is clicked
        if(SIBLING_CLICK == false){
            for (var i = 0; i < $(this).siblings().length; i++) {
                if ($($(this).siblings()[i]).hasClass("option")) {
                    $($(this).siblings()[i]).removeClass("option").addClass("option-clicked");
                }
            }
        }
    }

    updateOptionAfterClick.call(this); 

    var option = $(this).text();

    $(this).off('click'); // This line will unbind the click event
       switch(option) {


        case "Women Empowerment":
            womenEmpowerment();
            enableSiblingsClick();
            break;
        case "Career Development":
            careerDevelopment();
            enableSiblingsClick();
            break;
        case "Health and Wellness":
            healthAndWellness();
            enableSiblingsClick();
            break;
        case "Helpline Assistance":
            helplineAssistance();
            break;
        case "Empowerment Programs":
            empowermentPrograms();
            break;
        
        
        // second level options

        // for 0.
        case "What does 'women empowerment' mean?":
            whatIsEmpowerment1();
            enableSiblingsClick();

            break;
        case "Why is women's empowerment important in our society?":
            importanceOfEmpowerment();
            enableSiblingsClick();
            break;
        case "Can you give an example of a woman who made significant accomplishments in a traditionally male-dominated field?":
            exampleOfEmpoweredWoman();
            enableSiblingsClick();
            break;
        case "How does education contribute to women's empowerment?":
            educationAndEmpowerment();
            enableSiblingsClick();
            break;
        case "What role does media play in shaping perceptions of women's capabilities?":
            mediaRoleInEmpowerment();
            enableSiblingsClick();
            break;
        case "What are some challenges that women might face in pursuing their goals and dreams?":
            challengesForWomen();
            enableSiblingsClick();
            break;
        case "How can equal opportunities for women in the workplace enhance women's empowerment?":
            equalOpportunities();
            enableSiblingsClick();
            break;
        case "What is the significance of women's involvement in decision-making processes?":
            significanceOfInvolvement();
            enableSiblingsClick();
            break;
        case "How can women's economic empowerment lead to economic growth?":
            economicEmpowerment();
            enableSiblingsClick();
            break;
        case "How can challenging gender stereotypes promote women's empowerment?":
            challengingStereotypes();
            enableSiblingsClick();
            break;
        case "What are some ways to promote gender equality at home and in our communities?":
            promotingGenderEquality();
            enableSiblingsClick();
            break;
        case "How can legal rights and policies contribute to women's empowerment?":
            legalRightsAndPolicies();
            enableSiblingsClick();
            break;
        case "Can you explain the concept of the 'glass ceiling'?":
            glassCeilingConcept();
            enableSiblingsClick();
            break;
        case "What steps can individuals take to support women's empowerment in their everyday lives?":
            stepsToSupportEmpowerment();
            enableSiblingsClick();
            break;
        case "How can boys and men contribute to women's empowerment efforts?":
            boysAndMenContribution();
            enableSiblingsClick();
            break;
        case "Why is it important for women to have access to healthcare and family planning services?":
            accessToHealthcare();
            enableSiblingsClick();
            break;
        case "How does lack of access to clean water and sanitation affect women's empowerment?":
            lackOfAccessToCleanWater();
            enableSiblingsClick();
            break;
        case "What opportunities can STEM fields provide for women's empowerment?":
            stemFieldsOpportunities();
            enableSiblingsClick();
            break;
        case "How can art and literature promote women's empowerment?":
            artAndLiteraturePromotion();
            enableSiblingsClick();
            break;
        case "What is the role of community support in women's empowerment?":
            roleOfCommunitySupport();
            enableSiblingsClick();
            break;

        // for 1.Empowerment Programs
        case "Find me some Women empowerment Programs in India?":
            findEmpowermentProgramsInIndia();
            enableSiblingsClick();
            break;
        case "Women Empowerment":
            womenEmpowerment();
            enableSiblingsClick();
            break;
        case "What is empowerment?":
            whatIsEmpowerment();
            enableSiblingsClick();
            break;
        case "How many major schemes are there in India for Women Empowerment?":
            howManyMajorSchemesAreThereInIndiaForWomenEmpowerment();
            enableSiblingsClick();
            break;
        
        // for 2.Career Development
        case "How can I build skills?":
            howToBuildSkills();
            enableSiblingsClick();
            break;
        case "How can I apply for jobs?":
            howToApplyForJobs();
            enableSiblingsClick();
            break;
        case "Give me advice to build my career?":
            giveMeAdviceToBuildMyCareer();
            enableSiblingsClick();
            break;
        
        //for 3.Health and Wellness
        case "What do you know about Women's Health Issues in India?":
            whatDoYouKnowAboutWomensHealthIssuesInIndia();
            enableSiblingsClick();
            break;
        case "Find me some resources to keep myself healthy":
            findResourcesToKeepHealthy();
            enableSiblingsClick();
            break;
        case "Find me some resources to improve mental health":
            findResourcesToImproveMentalHealth();
            enableSiblingsClick();
            break;

        case "Find me some resources to track menstrual cycle":
            findResourcesToTrackMenstrualCycle();
            enableSiblingsClick();
            break;
        
        // for 4.Helpline Assistance

        default:
            // Check if the clicked option is a program
            if (programDescriptions.hasOwnProperty(option)) {
                displayProgramDetails(option);
                addBackToMainChatButton();
            } else {
                console.log("Option not recognized");
            }
    }
});

$(chatSampleHTML).on("click",'.program', function () {
    var program = $(this).text();
    displayProgramDetails(program);
});


// first level options

// Women Empowerment 

function womenEmpowerment() {
    var q1 = "You have selected <b>Women Empowerment</b>";
    var options = [
        "What does 'women empowerment' mean?",
        "Why is women's empowerment important in our society?",
        "Can you give an example of a woman who made significant accomplishments in a traditionally male-dominated field?",
        "How does education contribute to women's empowerment?",
        "What role does media play in shaping perceptions of women's capabilities?",
        "What are some challenges that women might face in pursuing their goals and dreams?",
        "How can equal opportunities for women in the workplace enhance women's empowerment?",
        "What is the significance of women's involvement in decision-making processes?",
        "How can women's economic empowerment lead to economic growth?",
        "How can challenging gender stereotypes promote women's empowerment?",
        "What are some ways to promote gender equality at home and in our communities?",
        "How can legal rights and policies contribute to women's empowerment?",
        "Can you explain the concept of the 'glass ceiling'?",
        "What steps can individuals take to support women's empowerment in their everyday lives?",
        "How can boys and men contribute to women's empowerment efforts?",
        "Why is it important for women to have access to healthcare and family planning services?",
        "How does lack of access to clean water and sanitation affect women's empowerment?",
        "What opportunities can STEM fields provide for women's empowerment?",
        "How can art and literature promote women's empowerment?",
        "What is the role of community support in women's empowerment?"
    ];
    appendToChatBody(q1, options);
}

function empowermentPrograms() {
    var q1 = "You have selected <b>Empowerment Programs</b>.";
    var options = ["Find me some Women empowerment Programs in India?", "What is empowerment?", "How many major schemes are there in India for Women Empowerment?"];
    appendToChatBody(q1, options);
}

function careerDevelopment() {
    var q1 = "You have selected <b>Career Development</b>.";
    var options = ["How can I build skills?", "How can I apply for jobs?", "Give me advice to build my career?"];
    appendToChatBody(q1, options);
}

function healthAndWellness() {
    var q1 = "You have selected <b>Health and Wellness</b>.";
    var options = [
        "What do you know about Women's Health Issues in India?",
        "Find me some resources to keep myself healthy",
        "Find me some resources to track menstrual cycle",
    ];
    appendToChatBody(q1, options);
}

function helplineAssistance() {
    var q1 = "You have selected <b>Helpline Assistance</b>.";
    var options = [
        "Dial 181 for 24*7 emergency As per Women Helpine Scheme," + 
        "launched in April 2015, the Women Helpline scheme aims to provide" +
        " women who have experienced abuse in either public or private " +
        "settings with 24*7 emergency assistance. "
    ];
    appendToChatBody(q1, options);
}

//  END first level options

// second level options
    // for 0.

    function whatIsEmpowerment1() {
        var q1 = "What does 'women empowerment' mean?";
        var programs = "Women empowerment means promoting equal rights, opportunities, and choices for women, enabling them to become self-reliant and achieve their goals.";
        appendToChatBody(q1, programs);
    }
    
    function importanceOfEmpowerment() {
        var q1 = "Why is women's empowerment important in our society?";
        var programs = "Women's empowerment is important because it promotes equality, fosters social and economic development, and ensures that women can participate fully in all aspects of life.";
        appendToChatBody(q1, programs);
    }
    
    function exampleOfEmpoweredWoman() {
        var q1 = "Can you give an example of a woman who made significant accomplishments in a traditionally male-dominated field?";
        var programs = "Sure, Marie Curie was a pioneering scientist who won Nobel Prizes in both Physics and Chemistry, breaking barriers for women in science.";
        appendToChatBody(q1, programs);
    }
    
    function educationAndEmpowerment() {
        var q1 = "How does education contribute to women's empowerment?";
        var programs = "Education equips women with knowledge and skills, boosts their confidence, and opens doors to various opportunities, enabling them to make informed choices.";
        appendToChatBody(q1, programs);
    }
    
    function mediaRoleInEmpowerment() {
        var q1 = "What role does media play in shaping perceptions of women's capabilities?";
        var programs = "Media can influence how people perceive women by portraying them in certain roles and situations. Positive portrayals can challenge stereotypes and encourage empowerment.";
        appendToChatBody(q1, programs);
    }
    
    function challengesForWomen() {
        var q1 = "What are some challenges that women might face in pursuing their goals and dreams?";
        var programs = "Challenges can include gender discrimination, limited access to education and job opportunities, and societal expectations that might limit their choices.";
        appendToChatBody(q1, programs);
    }
    
    function equalOpportunities() {
        var q1 = "How can equal opportunities for women in the workplace enhance women's empowerment?";
        var programs = "Equal opportunities allow women to showcase their skills and talents, break through glass ceilings, and contribute to decision-making processes.";
        appendToChatBody(q1, programs);
    }
    
    function significanceOfInvolvement() {
        var q1 = "What is the significance of women's involvement in decision-making processes?";
        var programs = "Women's participation ensures diverse perspectives, leading to better solutions and policies that address the needs of the entire population.";
        appendToChatBody(q1, programs);
    }
    
    function economicEmpowerment() {
        var q1 = "How can women's economic empowerment lead to economic growth?";
        var programs = "When women are economically empowered, they can contribute to their families' and communities' well-being, which, in turn, boosts overall economic growth.";
        appendToChatBody(q1, programs);
    }
    
    function challengingStereotypes() {
        var q1 = "How can challenging gender stereotypes promote women's empowerment?";
        var programs = "Challenging stereotypes helps break down societal limitations, allowing women to pursue a wider range of opportunities and roles.";
        appendToChatBody(q1, programs);
    }
    
    function promotingGenderEquality() {
        var q1 = "What are some ways to promote gender equality at home and in our communities?";
        var programs = "Encouraging equal sharing of responsibilities, treating everyone with respect, and providing equal opportunities for boys and girls are ways to promote gender equality.";
        appendToChatBody(q1, programs);
    }
    
    function legalRightsAndPolicies() {
        var q1 = "How can legal rights and policies contribute to women's empowerment?";
        var programs = "Legal rights and policies ensure that women have the same rights and protections as men, creating a foundation for their empowerment.";
        appendToChatBody(q1, programs);
    }
    
    function glassCeilingConcept() {
        var q1 = "Can you explain the concept of the 'glass ceiling'?";
        var programs = "The 'glass ceiling' refers to invisible barriers that prevent women from reaching higher levels of authority or success in their careers.";
        appendToChatBody(q1, programs);
    }
    
    function stepsToSupportEmpowerment() {
        var q1 = "What steps can individuals take to support women's empowerment in their everyday lives?";
        var programs = "Individuals can challenge stereotypes, treat everyone equally, support women's education, and stand up against gender-based discrimination.";
        appendToChatBody(q1, programs);
    }
    
    function boysAndMenContribution() {
        var q1 = "How can boys and men contribute to women's empowerment efforts?";
        var programs = "Boys and men can be allies by respecting women's rights, challenging gender norms, and promoting equality in their actions and interactions.";
        appendToChatBody(q1, programs);
    }
    
    function accessToHealthcare() {
        var q1 = "Why is it important for women to have access to healthcare and family planning services?";
        var programs = "Access to healthcare and family planning services empowers women to make informed decisions about their bodies and lives.";
        appendToChatBody(q1, programs);
    }
    
    function lackOfAccessToCleanWater() {
        var q1 = "How does lack of access to clean water and sanitation affect women's empowerment?";
        var programs = "Lack of access to clean water and sanitation can disproportionately impact women, as they often bear the responsibility for collecting water and managing hygiene.";
        appendToChatBody(q1, programs);
    }
    
    function stemFieldsOpportunities() {
        var q1 = "What opportunities can STEM fields provide for women's empowerment?";
        var programs = "STEM fields offer opportunities for women to excel in science, technology, engineering, and mathematics, traditionally male-dominated areas.";
        appendToChatBody(q1, programs);
    }
    
    function artAndLiteraturePromotion() {
        var q1 = "How can art and literature promote women's empowerment?";
        var programs = "Art and literature can challenge stereotypes, highlight women's achievements, and inspire others to pursue their goals, regardless of gender.";
        appendToChatBody(q1, programs);
    }
    
    function roleOfCommunitySupport() {
        var q1 = "What is the role of community support in women's empowerment?";
        var programs = "Community support provides encouragement, resources, and a sense of belonging, enabling women to overcome challenges and achieve their aspirations.";
        appendToChatBody(q1, programs);
    }


    // for 1.Empowerment Programs
function findEmpowermentProgramsInIndia() {
    var q1 = "<b>Women empowerment Programs in India:</b>";
    var programs = ["Beti Bachao Beti Padhao Scheme", "Working Women Hostel Scheme", "One-Stop Centre Scheme", "Women Helpline Scheme", "Mahila Police Volunteers Scheme", "SWADHAR Greh", "STEP (Support to Training and Employment Program for Women)", "Mahila Shakti Kendras (MSK)", "Rajiv Gandhi National Creche Scheme", "Ujjwala Scheme"];
    appendToChatBody(q1, programs);
    $(chatSampleHTML).on("click",'.program', function () {
        var program = $(this).text();
        displayProgramDetails(program);
    });
}

function whatIsEmpowerment() {
    var q1 = "What is empowerment?</b>";
    var programs = "As per Google's defination, empowerement refers to the process of becoming stronger and more confident, especially in controlling one's life and claiming one's rights.";
    appendToChatBody(q1, programs);
  
}

// How many major schemes are there in India for Women Empowerment

function howManyMajorSchemesAreThereInIndiaForWomenEmpowerment() {
    // How many major schemes are there in India for Women Empowerment?
    var q1 = "How many major schemes are there in India for Women Empowerment?";
    var programs = "There are about 10 widely known and implemented schemes introduced for the welfare of women. Some of these schemes are -" + "</br>"
    +  "Beti Bachao," + "</br>" 
    + " Beti Padhao Scheme," + "</br>"
    + "Working Women Hostel Scheme,"  + "</br>"
    + "One-Stop Centre Scheme.";
    appendToChatBody(q1, programs);
}
    // END for 1.Empowerment Programs

    // for 2.Career Development
function howToBuildSkills() {
    var q1 = "How can I build skills?</b>";
    const edxLink = "<a href='https://www.edx.org'>https://www.edx.org</a>";
    const courseraLink = "<a href='https://www.coursera.org/'>https://www.coursera.org/</a>";
    const udemyLink = "<a href='https://www.udemy.com/'>https://www.udemy.com/</a>";

    var programs = "Best way to build skills is to pursue online courses on the websites below." + "</br>" 
    + edxLink + "</br>"
    + courseraLink + "</br>"
    + udemyLink + "</br>";
    
    appendToChatBody(q1, programs);
   
}

function howToApplyForJobs() {
    var q1 = "How can I apply for jobs?</b>";
    const linkedInLink = "<a href='https://www.linkedin.com/feed/'>https://www.linkedin.com/feed/</a>";
    var programs = "If you are looking for job oppurtunities head over to LinkedIn and start by building a profile and then find jobs near you."
     + "</br>"
    + linkedInLink + "</br>";
    appendToChatBody(q1, programs);
  
}

function giveMeAdviceToBuildMyCareer() {
    var q1 = "Give me advice to build my career?</b>";
    const robertHalfLink = "<a href='https://www.roberthalf.com/us/en/insights/landing-job/10-great-career-resources-you-may-not-know-about'>https://www.roberthalf.com/us/en/insights/landing-job/10-great-career-resources-you-may-not-know-about</a>";
    var programs = "Great! I found a great resource to help you build your career. Why don't you start by reading the article below."
     + "</br>"
     + robertHalfLink + "</br>";
    appendToChatBody(q1, programs);
   
}
    // END for 2.Career Development

    // for 3.Health and Wellness

// What do you know about Women's Health Issues in India?
function whatDoYouKnowAboutWomensHealthIssuesInIndia() {
    var q1 = "What do you know about Women's Health Issues in India?";
    const healthIssuesLink = "<a href='https://ayu.health/blog/womens-health-issues-in-india-you-need-to-know/'>https://ayu.health/blog/womens-health-issues-in-india-you-need-to-know/</a>";
    const careinsuranceLink = "<a href='https://www.careinsurance.com/blog/health-insurance-articles/why-is-women-s-health-a-matter-of-concern-in-india'>https://www.careinsurance.com/blog/health-insurance-articles/why-is-women-s-health-a-matter-of-concern-in-india</a>";
    const timesofindiaLink = "<a href='https://timesofindia.indiatimes.com/blogs/voices/most-ignored-womens-health-issues-in-india/'>https://timesofindia.indiatimes.com/blogs/voices/most-ignored-womens-health-issues-in-india/</a>";
    var programs = "I found these articles relating to Women's Health Issues in India:</br>"
    + healthIssuesLink + "</br>"
    + careinsuranceLink + "</br>"
    + timesofindiaLink + "</br>";
    appendToChatBody(q1, programs);
}

// Find me some resources to keep myself healthy
function findResourcesToKeepHealthy() {
    var q1 = "Find me some resources to keep myself healthy";
    const eatingWellLink = "<a href='https://www.eatingwell.com/'>https://www.eatingwell.com/</a>";
    const healthLink = "<a href='https://www.health.com/'>https://www.health.com/</a>";
    const myFitnessPalLink = "<a href='https://www.myfitnesspal.com/'>https://www.myfitnesspal.com/</a>";
    var programs = "I found these top resources to keep yourself healthy. Maybe let's start by exploring these:</br>"
    + eatingWellLink + "</br>"
    + healthLink + "</br>"
    + myFitnessPalLink + "</br>";
    appendToChatBody(q1, programs);
}

// Find me some resources to improve mental health
function findResourcesToTrackMenstrualCycle() {
    var q1 = "Find me some resources to track menstrual cycle";
    const periodTrackerLink = "<a href='https://tampax.com/en-us/period-tracker/'>https://tampax.com/en-us/period-tracker/</a>";
    const periodCalendarLink = "<a href='https://apps.apple.com/us/app/period-tracker-period-calendar/id896501514'>https://apps.apple.com/us/app/period-tracker-period-calendar/id896501514</a>";
    const playtexLink = "<a href='https://playtextampons.com/pages/period-tracker'>https://playtextampons.com/pages/period-tracker</a>";
    var programs = "Sure! Here are some apps to track menstrual cycle:</br>"
    + periodTrackerLink + "</br>"
    + periodCalendarLink + "</br>"
    + playtexLink + "</br>";
    appendToChatBody(q1, programs);
}

    // END for 3.Health and Wellness

    // for 4.Helpline Assistance
function helplineAssistance() {
    var q1 = "Helpline Assistance?";
    var programs =  `Dial 181 for 24*7 emergency
    As per Women Helpine Scheme, launched in April 2015, 
    the Women Helpline scheme aims to provide women who have experienced 
    abuse in either public or private settings with 24*7 emergency assistance. 
    `;
    appendToChatBody(q1, programs);
}

    // END for 4.Helpline Assistance



// END second level options

function displayProgramDetails(program) {
    var details = programDescriptions[program];
    var p1 = `<p class='description'>${details}</p>`;
    var chatHTML = $(chatSampleHTML);
    chatHTML.find(".media-body").append(p1);
    chatHTML.find(".description").css({"white-space": "pre-wrap","margin": "10px 0px"});
    $("#chat-content").append(chatHTML);
}

//  add back to main chat button to chat body
function addBackToMainChatButton() {
    var backToMainChatButton = `<button class="btn btn-secondary back-to-main-chat">Back to Main Chat</button>`;
    var chatHTML = $(chatSampleHTML);
    chatHTML.find(".media-body").append(backToMainChatButton);
    // remove <img tag
    chatHTML.find("img").remove();
    // append but make sure it is always at the bottom
    // remove the previous back to main chat button
    $(".back-to-main-chat").remove();
    $("#chat-content").append(chatHTML);

    // add event listener to back to main chat button
    $(document).on("click", '.back-to-main-chat', function () {
        $("#chat-content").empty();
        // append           <button id="closeChat" class="bg-transparent text-white">x</button>

        var chatHTML = $(chatSampleHTML);

        header = `
        <div class="d-flex justify-content-start align-items-center mb-3">
        <a href="#" >
          <img  src="./asserts/logo-main.jpeg" alt="National Domestic Violence Hotline" class="img-fluid logo-small" />
        </a>
        <i class="fas fa-branch-icon fa-2x mr-2"></i> <!-- Replace 'fa-branch-icon' with the actual FontAwesome icon class for your branch -->
        <h2 class="font font-size-medium text-white">Chat with Meraki</h2> <!-- Replace 'Chat with Meraki' with the actual title -->
        <button id="closeChat" class="bg-transparent text-white">
          <i class="fas fa-times"></i> 
        </button>
      </div>

        `
        chatHTML.find("img").remove();
        chatHTML.find(".media-body").append(header);
        // remove <img tag
        // add event listener to close chat button
        $(document).on("click", '#closeChat', function () {
            document.querySelector('.card.card-bordered').style.display = 'none';
        });
        $("#chat-content").append(chatHTML);
        disableSiblingsClick();
        howCanIAssistYouToday();
        // scroll to top
        $('.card').animate({ scrollTop: 0 }, 'fast');
        
    });
}

function enableSiblingsClick() {
    SIBLING_CLICK = true;
}
function disableSiblingsClick() {
    SIBLING_CLICK = false;
}



// chat bottom
$(document).ready(function() {
    // Show or hide the button based on scroll position
    // of #chat-content
    $("#chat-content").scroll(function() {
        if ($(this).scrollTop() > 100) {
            $("#scrollUp").fadeIn();
        } else {
            $("#scrollUp").fadeOut();
        }
        });
    // Scroll to the top when the button is clicked
    $("#scrollUp").click(function() {
        $("#scrollUp").animate({ scrollTop: 0 }, "fast");
    });

    //on click of chat button,scroll to bottom
    $("#scrollUp").click(function() {
        $("#chat-content").animate({ scrollTop: 0 }, "fast");
    });
});
