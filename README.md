# OPA(Open Policy Agent) Prototype
This is a simple Open Policy Agent prototype to demonstrate some simple features on how it works.


## Setup
This project has a docker-compose file to easily run the prototype in docker. It uses port 8181 and maps to localhost.
To get started, simple use the following command(Docker Required):
<pre><code>docker-compose up opa server</code></pre>
This starts the container and volume mounts the policies folder to the container.
The OPA instance is now ready for interactions.

## Usage
To demonstrate some of the functionality OPA has, I have setup some prototypes.

### First Prototype
<p>The first prototype I have setup, simply has an input(Synchronous Push) that takes a greeting, and checks if it is <code>hello</code>. To see it in action, run the following curl command, it should return <code>result: true</code></p>
<pre><code>curl localhost:8181/v1/data/prototype1/allow -d '{"input": {"greeting": "hello"}}'</code></pre>

If you were to change the input greeting, you should see it return <code>result: false</code>
<pre><code>curl localhost:8181/v1/data/prototype1/allow -d '{"input": {"greeting": "not hello"}}'</code></pre>

### Second Prototype
<p>The second prototype I have setup, uses an external server which OPA calls to get a result(Synchronous Pull). The external server simply creates a random number between 0 and 10 and returns true if it its divisible by 2(which is 50% off the time).</p>
50% off the time, you should see the following result: <code>result: true</code> and the other 50% you should see <code>result: false</code>

<pre><code>curl localhost:8181/v1/data/prototype2/allow</code></pre>

### Third Prototype
<p>The thirt prototype I have set up, uses the OPA data api to store data(Asynchronous Push). The policy uses a OPA data file to verify the policy.

<pre><code>package prototype3

default allow = false

allow {
  data.test.result == true
}
</code></pre>
Without the data file created, it should return: <code>result: false</code></p>
<pre><code>curl localhost:8181/v1/data/prototype3/allow</code></pre>

If that is correct, you can upload the data file under <code>/v1/data/test</code> which looks like so:
<pre><code>{
  "result": true
}</code></pre>
This is a hardcoded result which is used by the third prototype as data.test.
The policy references the hardcoded result: true in the allow and checks if it indeed is true.
Since the document has been created, it should now return <code>result: true</code> when running the command
<pre><code>curl localhost:8181/v1/data/prototype3/allow</code></pre>
