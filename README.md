### Intelligent Vault

## App for a hash-like algorithm generator with adjustable outputs using neuronal networks

Neuronal networks, in general, can't be used to explain the patterns seen in the used data, even if the
neuronal network itself "see it". So what if we use a neuronal network as an encryption method by making
it memorize a given "password" and return a given "secret", which is not reversible because that would
require to solve a long and complex equation, nor can be brute forced because of the neuronal network's
structure that increase the chaotic behavior of the result, thus been comparable to a hash function
but the hability to "set" fixed values.

# What does it use?

Nextjs is used as the frontend and backend of the app, which show a dashboard in a website in the port
3000 by default. The dashboard allow run pytorch scripts that generate, use, change and remove neuronal
networks in a given structure.

# Usage

Download and start in dev mode with:
```bash
$ git clone https://SAValenciaA/intelligent-vault;
$ cd intelligent-vault;
$ npx next dev;
```
And done, you can create, and interact with your models
entering localhost:3000
