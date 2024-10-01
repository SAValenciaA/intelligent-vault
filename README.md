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

# TODOs before the proyect is considered finish

1. ~Remove autogenerated template from nextjs.~

2. ~Add files in their correct structures: APIs, Pytorch scripts and pages.~

3. Write pytorch scripts

    * ~Write script for neuronal network generation~~

    * ~Write script for neuronal network use.~

    * ~Write script for neuronal network elimination.~

3. Write api's

    * ~Write api for neuronal network generation given a secret and a password and saving it.~

    * ~Write api to use the generated neuronal network.~

    * ~Write api to remove neuronal network.~

4. Create dashboard's page.

    * Add style to it.

    * Use the colors: 
        - Violet: #845ec2
        - Light violet: #b39cd0
        - White: #fbeaff
        - Teal: #00c9a7
        - Dark grey: #222222
