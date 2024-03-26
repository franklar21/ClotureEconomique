using RestSharp;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClotureEconomique.WebSite
{
    public class emailHelper
    {
        [Obsolete]
        public static RestResponse SendSimpleMessage(string email)
        {
            try
            {
                RestClient client = new RestClient("https://api.mailgun.net/v3");
                client.AddDefaultHeader("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("api:868c186ece207b4032419174517f664c-309b0ef4-dbbc4200")));

                RestRequest request = new RestRequest();
                request.AddParameter("domain", "www.clotureeconomique.com", ParameterType.UrlSegment);
                request.Resource = "{domain}/messages";
                request.AddParameter("from", "Excited User <" + email + ">");
                //request.AddParameter("to", "bar@example.com");
                request.AddParameter("to", "larouche_33@hotmail.com");
                request.AddParameter("subject", "Hello");
                request.AddParameter("text", "Testing some Mailgun awesomeness!");
                request.Method = Method.Post;

                RestResponse response = client.Execute(request);
                return new RestResponse
                {
                    StatusCode = response.StatusCode,
                    Content = response.Content,
                    ErrorMessage = response.ErrorMessage
                };
            }
            catch (Exception ex)
            {
                // Loggez l'exception
                Trace.WriteLine("Une erreur s'est produite lors de l'envoi de l'e-mail : " + ex.Message);
                // Retournez une réponse d'erreur
                return new RestResponse
                {
                    StatusCode = System.Net.HttpStatusCode.InternalServerError,
                    ErrorMessage = "Une erreur s'est produite lors de l'envoi de l'e-mail."
                };
            }
        }
    }
}
