import React from 'react'

import { Accordion } from 'flowbite-react';

const Blog = () => {

    //create dynamic title

    return (
        <section className='accordion_section bg-lightGray py-14 lg:py-20'>
            <div className="container w-full mx-auto lg:max-w-6xl px-8">
                <div className="accordion_wrapper lg:max-w-3xl mx-auto">
                    <Accordion alwaysOpen={true}>
                        <Accordion.Panel>
                            <Accordion.Title>
                                What are the different ways to manage a state in a React application?
                            </Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-dark  text-left">
                                    The Four Kinds of React State to Manage
                                    Local state.
                                    Global state.
                                    Server state.
                                    URL state.
                                </p>

                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title>
                                How does prototypical inheritance work?
                            </Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-dark text-left">
                                    The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object
                                </p>

                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title>
                                What is a unit test? Why should we write unit tests?
                            </Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-dark text-left">
                                    The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                                </p>

                            </Accordion.Content>
                        </Accordion.Panel>
                        <Accordion.Panel>
                            <Accordion.Title>
                                React vs. Angular vs. Vue?
                            </Accordion.Title>
                            <Accordion.Content>
                                <p className="mb-2 text-dark text-left">
                                    Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option
                                </p>

                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>


                </div>
            </div>

        </section>
    )
}

export default Blog
