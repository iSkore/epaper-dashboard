Feature: Footer component

    Scenario: Load the web app
        When the web app renders
        When the footer renders
        Then the copyright should be visible
        Then the dark mode selection button should be visible
        And should change the application from dark mode to light mode when clicked
        And should change the application from light mode to dark mode when clicked
        Then the version should be visible
        Then the time should be visible
