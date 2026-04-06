using Xunit;
using PhuongXa.Application.Chung;

namespace PhuongXa.Application.Tests.Chung
{
    public class PhanHoiApiTests
    {
        [Fact]
        public void Test_PhanHoiApi_DefaultConstructor()
        {
            // Arrange & Act
            var result = new PhanHoiApi();

            // Assert
            Assert.NotNull(result);
        }
    }
}
