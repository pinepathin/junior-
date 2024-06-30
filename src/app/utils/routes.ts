const BASE_ENDPOINT = "http://localhost:8081/api";

export default  {
  BASE_ENDPOINT,
  LOGIN : `${BASE_ENDPOINT}/auth/login`,
  SIGNUP : `${BASE_ENDPOINT}/auth/sign-up`,
  POSTS : `${BASE_ENDPOINT}/posts`,
  COMMENTS: `${BASE_ENDPOINT}/comments`,
  ADD_COMMENT_IMG: `${BASE_ENDPOINT}/comments/image`,
  COMMENTS_OF_POST : `${BASE_ENDPOINT}/comments/post`

}

