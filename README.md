<!-- PROJECT SHIELDS -->
<!--
* I'm using markdown "reference style" links for readability.
* Reference links are enclosed in brackets [ ] instead of parentheses ( ).
* See the bottom of this document for the declaration of the reference variables
* for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
* https://www.markdownguide.org/basic-syntax/#reference-style-links


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="src/pic" alt="Logo" width="80" height="80">
  </a> -->

<h1 align="center"> Cipher.AI </h1>


  <p align="center">
    Discover cutting-edge AI models, trade insights, and leverage the power of collective intelligence with secure encryption and blockchain transparency.
  </p>
</div>

## About The Project
[View Demo](https://www.youtube.com/watch?v=aHAmkPBRMoM)
[View Site](https://cypherai-260f1.web.app/home)

![Home Page](https://firebasestorage.googleapis.com/v0/b/cipher-ai-exchange.appspot.com/o/home-page.png?alt=media&token=5fa99fa7-ffcb-4ff6-b891-4434e6f7654f)

### Inspiration 
The inspiration behind CipherAI stems from the growing demand for AI solutions and the challenges associated with acquiring and deploying AI models securely. Traditional centralized marketplaces lack transparency and expose sensitive data to potential threats. CipherAI was created to address these issues, making AI accessible to everyone while ensuring top-notch security and accountability.

### Introduction

CipherAI is a revolutionary decentralized AI model marketplace that simplifies the way you access and utilize artificial intelligence. It empowers individuals and businesses to buy, deploy, and securely manage AI models on the cloud. With advanced security measures and blockchain technology, CipherAI ensures trust, transparency, and accessibility in the world of AI.

### Process Workflow
<img align="center" src='https://firebasestorage.googleapis.com/v0/b/cipher-ai-exchange.appspot.com/o/workflow-bitget.jpg?alt=media&token=fd282cfa-80e2-4de3-b893-60ca28db01b5' width="80%">

### Features
##### Decentralized Marketplace: 
Eliminate intermediaries and reduce costs by accessing AI models directly, making it easier for users to find and purchase models for various applications.

##### Robust Security: 
Utilize RSA encryption to protect AI models, ensuring that only authorized users can access and use them. Models are securely stored on the cloud, safeguarding sensitive data and proprietary algorithms.

##### Blockchain Transparency: 
Leverage Tezos blockchain technology to establish trust and transparency in every transaction. Maintain an immutable ledger to record model ownership and usage, promoting accountability and reducing fraud.

##### Ease of Use: 
Simplify the deployment of AI models on the cloud, making AI accessible to users of all technical backgrounds. This feature fosters widespread adoption of AI in diverse industries.

### Tech-Stack
* [React](https://reactjs.org/)
* [Tezos](https://opentezos.com/)
* [Scikit Learn](https://scikit-learn.org)
* [Smartpy](https://smartpy.io/)
* [Taquito](https://tezostaquito.io/)
* [TZKT APi](https://api.tzkt.io/)

## Future Aspects and Scope
CipherAI has a promising future with several potential developments:

##### Expanded Model Catalog: 
Continuously adding diverse AI models to cater to a wide range of applications, from image recognition to natural language processing.

##### AI Model Customization: 
Offering users the ability to customize AI models to suit their specific needs and requirements.

##### Community Collaboration: 
Encouraging developers and data scientists to contribute their AI models to the marketplace, fostering a collaborative environment.

##### Integration with AI Services: 
Partnering with cloud providers and AI service providers to simplify the deployment and management of AI models.

##### Global Adoption: 
Expanding CipherAI's reach to serve businesses and individuals worldwide, democratizing access to AI.

## Setup

### Setup, Run, Compile & Deploy Steps :
1.  `npm install` it will install all your dependencies

2.  `npm start` it will install all the client dependencies i.e in React

3.  `npm run sync` this is a syncing command. Whenever the compile_config is changed in config.json this command must be executed from the terminal. This command helps the bundle to reconfigure the compilation parameters according to the changes you have made.

4.  `npm run compile` will build the contracts locally inside the folder ./contract_build. This command compiles the python file to a Michelson file and stores it in the ./contract_build folder.

5.  `npm run deploy` will deploy your contract with the params respect to your config.json

6.  `npm run test` It will run the whole template of SmartPy code with their scenario based testing. And the test results will be visualised in the teminal.
>Step 7 will also generate a test_build where your test results will be stored.

7.  `npm run get-entry-points` It will extract the entry-points from you recently compiled code and display in the terminal with a sample invocation which you can reference while invoking an entry-point from your dapp.
8.  *`npm run sync` is mandatory whenever your config.json file is changed !*

<p align="right">(<a href="#readme-top">Top</a>)</p>