# Devjams '22

### Potential Future Ideas
- AI/ML:
    - Zero shot classification on the abels such as job titles and skill, we can then extract the label percentages and set a certain minimum


#### Authentication
It helps a service understand who the user is, in most cases we pass our credentials to a server through the `Authorization header` or a custom header defined by the service we are trying to access.<br>
When we use request.get/post and specify an auth parameter (tuple consisting of username and password) requests is applying the credentials using HTTP’s Basic access authentication scheme under the hood. Hence we can use the http basic auth scheme ourself to create an authorizations object like `authentication = HTTPBasicAuth(credentials['username'], credentials['password'])`.
<br><br>

#### Zero shot learning
ZSL moslty refers to very specific type of task that is learning a classifier on 1 set of labels and then evaluating on a different set of labels the model has never seen before. We will be using this in our case as well where for every repository a person has we will generate a list of candidate labels and calculate their probabilites. 
Any candidate label above the baseline probability will be accpeted as the skill of the person. (our default baseline baseline is: )

