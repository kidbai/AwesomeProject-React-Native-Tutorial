import queryString from 'query-string'

const baseUrl = 'https://cnodejs.org/api/v1'
const apiTopics = baseUrl + '/topics'
const apiTopic = baseUrl + '/topic'

export const getCnodeTopics = (params) => {
  console.log(params)
  params = Object.assign({}, params, {
    page: 1,
    limit: 40
  })
  const stringified = queryString.stringify(params)
  return fetch(apiTopics + '?' + stringified)
}

export const getCnodeTopic = (id) => {
  return fetch(apiTopic + '/' + id)
}
