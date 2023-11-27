// https://stackoverflow.com/questions/57956476/how-to-set-up-an-endpoint-for-health-check-on-next-js

export default function handler(req, res) {
  res.status(200).send('')
}
