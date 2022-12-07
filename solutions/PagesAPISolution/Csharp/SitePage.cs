using Microsoft.Graph;
using System;
using System.Collections.Generic;

namespace MSGraphPagesAPIExample
{
  public class SitePage
  {
    //Properties of SitePage
    public enum PageLayoutType
    {
      microsoftReserved,
      article,
      home,
      unknownFutureValue,
    }

    public enum PagePromotionType
    {
      microsoftReserved,
      page,
      newsPost,
      unknownFutureValue,
    }

    public string Title { get; set; }

    public string Name { get; set; }

    public string WebUrl { get; set; }

    public string ID { get; set; }

    public string LastModifiedDateTime { get; set; }

    public PageLayoutType? PageLayout { get; set; }

    public DateTimeOffset? FirstPublishedDate { get; set; }

    public string ThumbnailWebUrl { get; set; }

    public PagePromotionType? PromotionKind { get; set; }

    public bool? ShowComments { get; set; }

    public bool? ShowRecommendedPages { get; set; }
  }

}