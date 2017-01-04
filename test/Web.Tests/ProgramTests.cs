using System;
using NUnit.Framework;

namespace Web.Tests
{
    [TestFixture]
    public class ProgramTests
    {
        [Test]
        public void InAllCases_GetTrue_ReturnsTrue()
        {
            Assert.True(Program.GetTrue());
        }
    }
}