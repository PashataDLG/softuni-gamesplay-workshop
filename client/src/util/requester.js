const request = async (method, url, data) => {
    try {
        let buildRequest;

        if(method === 'GET'){
            buildRequest = fetch(url);
        } else {
            buildRequest = fetch(url, {
                method,
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }
        const response = await buildRequest;

        if(response.ok !== true){
            const error = await response.json();
            throw new Error(error.message);
        }

        const result = await response.json();

        return result;
    } catch (err) {
        alert(err);
        throw err;
    }
};

export const get = request.bind({}, 'GET');
export const put = request.bind({}, 'PUT');
export const post = request.bind({}, 'POST');
export const patch = request.bind({}, 'PATCH');
export const del = request.bind({}, 'DELETE');