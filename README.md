


### The Parse API:
[API Quick Reference](http://docs.parseplatform.org/rest/guide/#quick-reference)

#### Example message format to send to the server:
```javascript
var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};
```

#### Here's the lines of code to send an example POST request:
```javascript
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});
```
## TODO

### Setup
* [ ] Install Pomander
* [ ] Add Underscore.js to Bower `bower install --save underscore`
* [ ] Add Underscore.js to client/index.html
* [ ] Add jQuery to client/index.html
* [ ] Continue to use bower to install (and keep track of) any additional libraries you add as you work through this sprint.

### Messages
Open up client/scripts/app.js and start coding.

* [ ] Display messages retrieved from the parse server.  
* [ ] Use proper escaping on any user input.
   * [ ] Research and implement anti XSS sanitizing
   * [ ] Read [Escaping overview](http://wonko.com/post/html-escaping)
   * [ ] Read the [XSS Prevention Cheat Sheet](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet)_

   * [ ] Escape ``&, <, >, ", ', , `, !, @, $, %, (, ), =, +, {, }, [, and ]``
   * [ ] Use HTML encoding to accept some characters  

```
& --> &amp;
< --> &lt;
> --> &gt;
" --> &quot;
' --> &#x27;     
/ --> &#x2F;     forward slash is included as it helps end an HTML entity
```

   * [ ] Install [ESAPI library](https://github.com/ESAPI/owasp-esapi-js) to handle escaping
     * [ ]  `bower install owasp-esapi-js`
   * [ ] Specify UTF8 in the head of the HTML.  

   ```html
   <head>
     <meta charset="UTF-8">
   </head>
   ```
* [ ] Create a XSS Attach which logs warnings to the users console.  
   * [ ] `console.log("%cBlue! %cGreen", "color: blue; font-size:15px;", "color: green; font-size:12px;");`

### Rooms

* [ ] Allow users to create rooms and enter existing rooms - Rooms are defined by the .roomname property of messages, so you'll need to filter them somehow.

### Socializing

* [ ]  Allow users to 'befriend' other users by clicking on their user name
* [ ]  Display all messages sent by friends in bold

![example](https://cloud.githubusercontent.com/assets/15180/5589913/efaba092-90dd-11e4-95bb-365c53dc4b91.gif)


## Advanced Content

Our advanced content is intended to throw you in over your head, requiring you to solve problems with very little support or oversight, much like you would as a mid or senior level engineer. The following problem is no exception, and you may have to do a fair amount of work to get enough context to get started on the problem itself.

For each of the features below, write new `describe` blocks, with tests, inside `spec/chatterboxSpec.js` before implementing.

* [ ] Construct a Parse query that responds with only messages from a specific room. Use this query to simplify your room filtering logic.
* [ ] Allow users to have more than one room open at a time using tabs
* [ ] Show unread message counts in open tabs and a special notifier when the user is mentioned

## Nightmare Mode

If you've made it this far you're in for some real fun, it's time to convert your Chatterbox application into a Twitter clone. If you don't have a Twitter account we recommend you create one so that you can direct your remaining efforts towards mimicking the functionality and styling of a real Twitter feed.

Recognizing that there are constraints in place given that your classmates are not using the same code base as you (of course you could organize!), feel free to conduct this refactor as you see fit. If you wish you may use the following as recommendations for the features you should implement to complete the refactor successfully:

* [ ] A settings pane where a user can change their personal info and upload a photo (photos may not be stored in parse)
* [ ] The ability to follow other users, only displaying the messages of those you are following
* [ ] The ability to 'heart' other users' messages
* [ ] The ability to generate and display summary metrics on the activity of yourself and other users
* [ ] Styling that looks as close as possible to an actual Twitter feed. You might consider the wildly popular CSS framework [Bootstrap](http://getbootstrap.com/) to help you out, especially since it was built at Twitter
